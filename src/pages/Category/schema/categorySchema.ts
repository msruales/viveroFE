import * as yup from 'yup'

export const categorySchema = yup.object({
    name: yup.string().required('Requerido'),
    description: yup.string().required('Requerido'),
})
