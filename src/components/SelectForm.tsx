import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem, {MenuItemTypeMap} from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useField} from "formik";
import {BaseTextFieldProps, ExtendButtonBase} from "@mui/material";
// @ts-ignore
import {useId} from "react";

interface Props {
    label: string,
    name: string,
    type?: 'text' | 'email' | 'password' | 'color',
    required?: boolean,
    fullWidth?: boolean
    sx?: BaseTextFieldProps

    [x: string]: any,

    children: React.ReactNode
}

export const SelectForm = ({children, label, ...props}: Props) => {

    const [field, meta] = useField(props)
    const id = useId()
    return (
        <FormControl error={Boolean(meta.error)}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                fullWidth
                labelId={id}
                label={label}
                {...props}
                {...field}
            >
                {children}
            </Select>
            {
                Boolean(meta.error) && (
                    <FormHelperText>{meta.error}</FormHelperText>
                )
            }

        </FormControl>
    )
}
export default SelectForm
