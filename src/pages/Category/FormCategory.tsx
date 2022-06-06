import {Formik} from "formik";
import {Button, Divider, FormGroup, Stack} from "@mui/material";
import {InputForm} from "../../components";
import {Category} from "./model/category.model";
import {categorySchema} from "./schema/categorySchema";


interface Props {
    handleSubmit(category: Omit<Category, 'id'|'status'>): void
    handleClose: () => void
}
const FormCategory = ({handleSubmit, handleClose }:Props) => {
    return (
        <Formik initialValues={{
            name: '',
            description: '',
        }}
                validationSchema={categorySchema}
                onSubmit={handleSubmit}>
            {
                ({submitForm}) => (
                    <>
                        <FormGroup>
                            <Divider/>
                            <InputForm label="Nombre" name="name"/>
                            <InputForm label="Descripcion" name="description"/>
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
    )
}

export default FormCategory
