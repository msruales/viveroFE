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
    IconButton,
    Input,
    Stack,
    } from "@mui/material";
import * as React from "react";
import {useDeleteProductMutation} from "../../services/productApi";
import SkeletonTable from "../../components/SkeletonTable";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFilter} from "../../hooks/useFilter";
import {Category} from "./model/category.model";
import {useGetCategoryListQuery} from "../../services/categoryApi";
import TablePagination from "../../components/TablePagination";

export const CategoryListTable = () => {

    const {optionsPage, search, handleOnPageChange, handleChangeSearch, handleChangeRowsPerPage} = useFilter(0)

    const {data, isLoading, isFetching} = useGetCategoryListQuery({page: optionsPage.page+1, search, perPage: optionsPage.perPage})
    const [updatePost, {isLoading: isUpdating}] = useDeleteProductMutation()

    const handleDelete = async (id: string) => {

        await updatePost(id).unwrap()

    }
    const handleUpdate = (category: Category) => {
        console.log(category)
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
    if (!data) {
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
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Estado</TableCell>
                                <TableCell align="center">Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                ( isFetching && !isUpdating ) ? (
                                    <SkeletonTable rows={10} columns={6}/>
                                ) : (
                                    data?.products?.map((category: Category) => (
                                        <TableRow
                                            key={category.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {category.name}
                                            </TableCell>
                                            <TableCell align="right">{category.description}</TableCell>
                                            <TableCell align="right">{category.status}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="error" onClick={() => handleDelete(category.id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton color="warning" onClick={() => handleUpdate(category)}>
                                                    <SettingsIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                   <TablePagination
                       paginationData={data.pagination}
                       labelRowsPerPage="Categorias por pagina:"
                       page={optionsPage.page}
                       handleOnPageChange={handleOnPageChange}
                       handleChangeRowsPerPage={handleChangeRowsPerPage}
                       />
                </TableContainer>
            </Stack>

        </>

    )
}
