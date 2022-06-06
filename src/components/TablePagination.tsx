import {Pagination as PaginationModel} from "../models/pagination.model";
import {ChangeEvent} from "react";
import {LabelDisplayedRowsArgs, TablePagination as TablePaginationMUI} from "@mui/material";
import * as React from "react";

interface Props {
    paginationData: PaginationModel
    labelRowsPerPage: string
    page: number
    handleOnPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void,
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}
export const TablePagination = ({page, paginationData, labelRowsPerPage , handleOnPageChange, handleChangeRowsPerPage} : Props) => {

    const {total,perPage} = paginationData
    return (
        <TablePaginationMUI
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={total}
            labelDisplayedRows={({from, to, count}: LabelDisplayedRowsArgs) => `${from}–${to} de ${count !== -1 ? count : `mas que ${to}`}`}
            rowsPerPage={perPage}
            page={page}
            onPageChange={handleOnPageChange}
            labelRowsPerPage={labelRowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}

export default TablePagination
