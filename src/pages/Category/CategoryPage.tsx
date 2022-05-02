import {FabAddButton} from "../../components";
import {Paper, Stack} from "@mui/material";
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const CategoryPage = () => {

    const handleClick = () => {
        console.log('add')
    }

    return (
        <div>
            <Stack spacing={2}>
              <h1>adasd</h1>
              <h1>adasd</h1>
              <h1>adasd</h1>
            </Stack>
            <FabAddButton onClick={handleClick}/>
        </div>
    )
}
export default CategoryPage
