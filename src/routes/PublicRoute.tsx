import {useSelector} from "react-redux";
import { selectIsAuth} from "../redux/slices/authSlice";
import {Navigate} from "react-router-dom";
import {FC} from "react";

type Props = {
    children: any
}

export const PublicRoute: FC<Props> = ({children}: Props) => {

    const isAuth = useSelector(selectIsAuth)

    return isAuth
        ? <Navigate to="/" />
        : children

}

export default PublicRoute
