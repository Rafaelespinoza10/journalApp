import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme  = createTheme({
    palette :{
        primary:{
            main: '#2f55A4'
        }, 
        secondary:{
            main: '#543884'
        }, 
        error:{
            main: red[600]
        }
    }
});