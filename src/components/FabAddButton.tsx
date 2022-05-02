import AddIcon from "@mui/icons-material/Add";
import {Fab, SxProps} from "@mui/material";

const fabStyle: SxProps = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

type Props = {
    onClick: () => void
    sx?: SxProps,
}

export const FabAddButton = ({ onClick, sx: style}: Props) => {
    return (
        <Fab color="secondary" aria-label="add" sx={{...fabStyle, ...style}} onClick={ onClick }>
            <AddIcon />
        </Fab>
    )
}
export default FabAddButton
