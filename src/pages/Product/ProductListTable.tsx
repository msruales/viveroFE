import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Backdrop, Button, CircularProgress, IconButton, Input, Pagination, Skeleton, Stack} from "@mui/material";
import * as React from "react";
import {useDeleteProductMutation, useGetProductListQuery} from "../../services/productApi";
import {Product} from "./model/product.model";
import {useRef, useState} from "react";
import SkeletonTable from "../../components/SkeletonTable";

import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductListTable = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const {data, isLoading, isFetching} = useGetProductListQuery({page, search})

    const [updatePost, { isLoading: isUpdating }] = useDeleteProductMutation()

    const selectPage = (e: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }
    const debounceRef = useRef<NodeJS.Timeout>()
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        if (debounceRef.current)
            clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            setSearch(event.target.value)
            setPage(1)
        }, 350)
    }
    const handleDelete = async (id: string) => {

        console.log(await updatePost(id).unwrap())

        console.log(id)
    }
    const handleUpdate = (product: Product) => {
        console.log(product)
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
    return (
        <>
            <Stack spacing={4}>
                <Input type="search" placeholder="Buscar..." onChange={handleChange}/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                isFetching ? (
                                    <SkeletonTable rows={10} columns={6}/>
                                ) : (
                                    data?.products?.map((product: Product) => (
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
                                )
                            }
                        </TableBody>
                    </Table>
                    {
                        data?.pagination && (
                            <Pagination sx={{
                                margin: '10px',
                                float: 'right'
                            }}
                                        count={data.pagination.lastPage}
                                        color="primary"
                                        onChange={selectPage}/>
                        )
                    }

                </TableContainer>
            </Stack>

        </>

    )
}
