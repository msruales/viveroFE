import * as yup from 'yup';

export const productSchema = yup.object({
    name: yup.string().required('Requerido'),
    description: yup.string().required('Requerido'),
    price: yup.number().required('Requerido'),
    categoryId: yup.number().required('Requerido'),
    stock: yup.number().required('Requerido'),
})
