import {FabAddButton} from "../../components";
import {ProductListTable} from "./ProductListTable";
import TransitionsModal from "../../shared/TransitionModal";
import {FormikValues} from "formik";
import {useToggle} from "../../hooks";
import TitleModal from "../../components/TitleModal";
import {FormProduct} from "./FormProduct";
import {useAddProductMutation, useUpdatePostMutation} from "../../services/productApi";
import {useEffect, useState} from "react";
import {Product} from "./model/product.model";

export const ProductPage = () => {

    const [addProduct, {isSuccess: isAdded}] = useAddProductMutation()
    const [updateProduct, {isSuccess: isUpdated}] = useUpdatePostMutation()

    const [product, setProduct] = useState<Product>()

    const {isOpen, onClose, onOpen} = useToggle()

    const handleSubmit = (values: FormikValues) => {
        addProduct({...values})
    }

    const onEdit = (product: Product) => {
        setProduct(product)
        onOpen()
    }

    const onCreate = () => {
        setProduct(undefined)
        onOpen()
    }

    const handleUpdate = (values: FormikValues) => {
        updateProduct({...values})
    }

    useEffect(() => {

        if (isAdded || isUpdated) {
            onClose()
        }

    }, [isAdded, isUpdated])

    return (
        <div>
            <h1> Productos </h1>
            <ProductListTable handleUpdate={onEdit}/>
            <FabAddButton onClick={onCreate}/>
            {isOpen && (
                <TransitionsModal isOpen={isOpen} handleClose={onClose}>
                    <TitleModal title={product ? "Actualizar Producto" : "Agregar Producto"}/>
                    <FormProduct handleSubmit={product ? handleUpdate : handleSubmit}
                                 initialValues={product ? product : undefined} onClose={onClose}/>
                </TransitionsModal>
            )}

        </div>
    )
}
export default ProductPage
