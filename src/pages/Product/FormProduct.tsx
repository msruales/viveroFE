import {Formik} from "formik";
import {Button, Divider, FormGroup, MenuItem, Skeleton, Stack} from "@mui/material";
import SelectForm from "../../components/SelectForm";
import {InputForm} from "../../components";
import {Product} from "./model/product.model";
import {useGetCategoriesSelectQuery} from "../../services/categoryApi";
import {Category} from "../../models/category.model";
import {productSchema} from "./schema/productSchema";
import FormControl from "@mui/material/FormControl";

interface Props {
    handleSubmit: (product: Partial<Product>) => void
    onClose: () => void
    initialValues?: Partial<Product>
    isEdit?: boolean
}

export const FormProduct = ({handleSubmit, onClose, isEdit, initialValues}: Props) => {

    const {data: categories, isLoading} = useGetCategoriesSelectQuery('')

    //
    // if(isLoading){
    //     return (
    //         <div>
    //             Cargando..
    //         </div>
    //     )
    // }

    return (
        <Formik initialValues={ initialValues ? initialValues : {
            name: '',
            description: '',
            price: '',
            stock: 0,
            categoryId: ''
        }}
                validationSchema={ productSchema }
                onSubmit={handleSubmit}>
            {
                ({submitForm}) => (
                    <>
                        <FormGroup>
                            <Divider/>
                            {
                                isLoading
                                    ? (
                                        <FormControl>
                                            Cargando Categorias
                                        </FormControl>
                                    )
                                    : (
                                        <SelectForm label="Categoria" name="categoryId">
                                            <MenuItem value="">
                                                <em>Seleccione un valor</em>
                                            </MenuItem>
                                            {
                                                categories.map((category: Category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </SelectForm>
                                    )
                            }

                            <InputForm label="Nombre" name="name"/>
                            <InputForm label="Descripcion" name="description"/>
                            <InputForm label="Precio" name="price" type="number"/>
                            <InputForm label="Stock" name="stock" type="number"/>
                        </FormGroup>
                        <Stack direction="row" mt={2} justifyContent="space-around"
                               alignItems="center">
                            <Button onClick={onClose} color="error">Cerrar</Button>
                            <Button type="submit" onClick={submitForm}>Guardar</Button>
                        </Stack>

                    </>
                )
            }

        </Formik>
    )
}
