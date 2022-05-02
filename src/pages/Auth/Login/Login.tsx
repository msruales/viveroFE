import {
    Alert,
    Avatar,
    Box,
    Button,
    Container, Snackbar,
    Typography
} from "@mui/material";
import {InputForm, SnackbarCustom} from "../../../components";
import {Form, Formik} from "formik";
import {validationLogin} from "./schema/Schema";
import {useLoginMutation} from "../service/authApi";
import {useAppDispatch} from "../../../app/hooks";
import {setCredentials} from "../../../redux/slices/authSlice";

export const Login = () => {

    const [login, {isLoading, isError, error}] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleClick = async (values: any) => {
        const res = await login(values).unwrap()
        dispatch(setCredentials({...res}))
    }



    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}/>

                    <Typography component="h1" variant="h5">
                        Ingresar
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationLogin}
                        onSubmit={handleClick}>

                        {() => (

                            <Form noValidate>
                                <InputForm label="Email" name="email" autoFocus/>
                                <InputForm label="Contraseña" name="password" type="password"/>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    disabled={isLoading}
                                >
                                    Entrar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    { isError && (
                        <SnackbarCustom open={isError} message={(error as any)?.data?.message} severity="error" />
                    )}
                </Box>
            </Container>
        </div>
    )
}

export default Login
