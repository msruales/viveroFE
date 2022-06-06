import {ErrorMessage, useField} from "formik";
import {BaseTextFieldProps, FormControl, TextField} from "@mui/material";

interface Props {
    label: string,
    name: string,
    type?: 'text' | 'email' | 'password' | 'color' | 'number',
    placeholder?: string,
    required?: boolean,
    fullWidth?: boolean
    sx?: BaseTextFieldProps

    [x: string]: any
}

export const InputForm = ({label, required = false, fullWidth = true, ...props}: Props) => {

    const [field, meta] = useField(props)

    return (
        <FormControl>
            <TextField
                error={meta.error && meta.touched ? true : false}
                margin="normal"
                required={required}
                fullWidth
                {...field}
                {...props}
                label={label}
                helperText={meta.error}
            />
        </FormControl>
    )
}
