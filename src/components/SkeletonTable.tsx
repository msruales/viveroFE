import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Skeleton} from "@mui/material";
import * as React from "react";
import TableBody from "@mui/material/TableBody";

interface Props {
    rows: number,
    columns: number
}

const SkeletonTable = ({rows, columns}: Props) => {

    const arrayRows = [...Array(rows)]
    const arrayColumns = [...Array(columns)]

    const listColumns = arrayColumns.map((element,index) => (
        <TableCell align="right"  key={index}>
            <Skeleton variant="rectangular" width="100%"/>
        </TableCell>
    ))

    const listRows = arrayRows.map((element,index) => (
        <TableRow key={index}>
            {listColumns}
        </TableRow>
    ))

    return (
        <>
            {
                listRows
            }
        </>

    )
}

export default SkeletonTable
