import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
    Backdrop,
    CircularProgress,
    Box,
    IconButton,
    Input,
    LinearProgress,
    Stack,
    TableFooter
} from "@mui/material";
import * as React from "react";
import {useDeleteProductMutation, useGetProductListQuery} from "../../services/productApi";
import {Product} from "./model/product.model";
import SkeletonTable from "../../components/SkeletonTable";

import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFilter} from "../../hooks/useFilter";
import TablePagination from "../../components/TablePagination";

interface Props {
    handleUpdate: (product: Product) => void
}

export const ProductListTable = ({handleUpdate}: Props) => {

    const {optionsPage, handleChangeRowsPerPage, search, handleOnPageChange, handleChangeSearch} = useFilter(0)

    const {data, isLoading, isFetching,} = useGetProductListQuery({
        page: optionsPage.page + 1,
        search,
        rowsPerPage: optionsPage.perPage
    })
    const [updatePost, {isLoading: isDeleting}] = useDeleteProductMutation()

    const handleDelete = async (id: string) => {

        await updatePost(id).unwrap()

    }

    if (isLoading) {
        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1}}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }

    if (!data?.products.length) {
        return (
            <div>
                <h1>
                    NO DATA
                </h1>
            </div>
        )

    }
    return (
        <>
            <Stack spacing={4}>
                <Input type="search" placeholder="Buscar..." onChange={handleChangeSearch}/>
                <TableContainer component={Paper}>
                    {isFetching && (
                        <Box sx={{width: '100%'}}>
                            <LinearProgress/>
                        </Box>
                    )}
                    < Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Stock</TableCell>
                                <TableCell align="right">Categoria</TableCell>
                                <TableCell align="center">Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                data.products?.map((product: Product) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {product.name}
                                        </TableCell>
                                        <TableCell align="right">{product.description}</TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right">{product.stock}</TableCell>
                                        <TableCell align="right">{product.category.name}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="error" onClick={() => handleDelete(product.id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <IconButton color="warning" onClick={() => handleUpdate(product)}>
                                                <SettingsIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                       page={optionsPage.page}
                       handleChangeRowsPerPage={handleChangeRowsPerPage}
                       paginationData={data.pagination}
                       handleOnPageChange={handleOnPageChange}
                       labelRowsPerPage={"Productos por pagina"}
                    />
                </TableContainer>
            </Stack>

        </>

    )
}
