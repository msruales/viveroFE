import {FabAddButton, BasicTable, InputForm} from "../../components";
import {useGetProductListQuery} from "../../services/productApi";
import {ProductListTable} from "./ProductListTable";
import TransitionsModal from "../../shared/TransitionModal";
import {useState} from "react";
import {Formik, FormikValues} from "formik";
import {
    Button,
    Divider,
    FormControl,
    FormGroup,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem, Stack,
    Typography
} from "@mui/material";
import SelectForm from "../../components/SelectForm";
import {Toolbar} from '@mui/material';

export const ProductPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        console.log(
            'cerrado'
        )
        setIsOpen(false)
    }

    const handleSubmit = (values: FormikValues) => {
        console.log(values)
    }

    return (
        <div>
            <h1> Productos </h1>

            <ProductListTable/>
            {/*<BasicTable />*/}

            <FabAddButton onClick={handleClick}/>
            {isOpen && (
                <TransitionsModal isOpen={isOpen} handleClose={handleClose}>
                    <Toolbar>
                        <Typography mb={2} variant="h4" component="h2">
                            Agregar Producto
                        </Typography>
                    </Toolbar>
                    <Formik initialValues={{name: '', description: '', price: '', categoryId: ''}}
                            onSubmit={handleSubmit}>
                        {
                            ({submitForm}) => (
                                <>
                                    <FormGroup>
                                        <Divider/>
                                        <SelectForm label="Categoria" name="categoryId">
                                            <MenuItem value="">
                                                <em>Seleccione un valor</em>
                                            </MenuItem>
                                            <MenuItem value="2">
                                                asdx
                                            </MenuItem>
                                        </SelectForm>
                                        <InputForm label="Nombre" name="name"/>
                                        <InputForm label="Descripcion" name="description"/>
                                        <InputForm label="Precio" name="price" type="number"/>
                                        <InputForm label="Stock" name="stock" type="number"/>

                                    </FormGroup>
                                    <Stack direction="row" mt={2} justifyContent="space-around"
                                           alignItems="center">
                                        <Button onClick={handleClose} color="error">Cerrar</Button>
                                        <Button type="submit" onClick={submitForm}>Guardar</Button>
                                    </Stack>

                                </>
                            )
                        }

                    </Formik>
                </TransitionsModal>
            )}

        </div>
    )
}
export default ProductPage
