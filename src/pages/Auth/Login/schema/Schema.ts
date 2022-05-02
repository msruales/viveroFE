import * as Yup from 'yup'


export const validationLogin = Yup.object({
    email: Yup.string().email('Email no valido').required('Requerido'),
    password: Yup.string().required('Requerido'),
})

