import {Toolbar, Typography} from "@mui/material";

export const TitleModal = ({title}: {title: string}) => {
    return (
        <Toolbar>
            <Typography mb={2} variant="h4" component="h4">
                {title}
            </Typography>
        </Toolbar>
    )
}
export default TitleModal
