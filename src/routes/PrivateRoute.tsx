import {useSelector} from "react-redux";
import {selectCurrentUser, selectIsAuth} from "../redux/slices/authSlice";
import {Navigate} from "react-router-dom";
import {FC} from "react";

type Props = {
    children: any
}

export const PrivateRoute: FC<Props> = ({children}: Props) => {

    const isAuth = useSelector(selectIsAuth)

   return isAuth
    ? children
       : <Navigate to="login" />

}

export default PrivateRoute
