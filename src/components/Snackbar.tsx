import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

type Props = {
    open: boolean
    message: string
    severity: "success" | "info" | "warning" | "error" | undefined
}
export const SnackbarCustom = ({open = false, message, severity}: Props) => {
    const [isOpen, setIsOpen] = useState(open)
    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    )
}
export default SnackbarCustom
