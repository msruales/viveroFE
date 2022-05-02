import {Route, Routes} from "react-router-dom";
import {Login} from "../pages/";
import DashboardRoutes from "./DashboardRoutes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import {useReloadUserQuery} from "../pages/Auth/service/authApi";
import {useAppDispatch} from "../app/hooks";
import {setCredentials} from "../redux/slices/authSlice";
import {useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";


const AppRouter = () => {

    const existToken = Boolean(localStorage.getItem('token'))

    const {data, isError} = useReloadUserQuery(String(localStorage.getItem('token')), {skip: !existToken});

    const dispatch = useAppDispatch()
    const [checking, setChecking] = useState(true)

    useEffect(() => {

        if(!existToken || isError){
            setChecking(false)
        }
        if (data) {
            dispatch(setCredentials({...data!}))
            setChecking(false)
        }

    }, [data,existToken,isError]);


    if (checking) {
        return (<LinearProgress/>)
    }

    return (
        <div className="">
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                }/>

                <Route path="/*" element={
                    <PrivateRoute>
                        <DashboardRoutes/>
                    </PrivateRoute>
                }/>

            </Routes>
        </div>
    )
}
export default AppRouter
