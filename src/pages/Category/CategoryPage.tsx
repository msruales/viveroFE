import {FabAddButton} from "../../components";
import {Stack} from "@mui/material";
import {CategoryListTable} from "./CategoryListTable";

import {useToggle} from "../../hooks";
import TransitionsModal from "../../shared/TransitionModal";
import TitleModal from "../../components/TitleModal";
import FormCategory from "./FormCategory";
import {Category} from "./model/category.model";


export const CategoryPage = () => {

    const {isOpen, onOpen, onClose} = useToggle()

    const handleSubmit = (category: Category) => {
        console.log(category)
    }

    return (
        <div>
            <h1> Categorias </h1>
            <Stack spacing={2}>
                <CategoryListTable/>
            </Stack>
            <FabAddButton onClick={onOpen}/>

            {
                isOpen && (
                    <TransitionsModal isOpen={isOpen} handleClose={onClose}>
                        <TitleModal title="Agregar Categoria" />
                        <FormCategory handleSubmit={handleSubmit} handleClose={onClose} />
                    </TransitionsModal>
                )
            }

        </div>
    )
}
export default CategoryPage
