import {createTheme} from "@mui/material/styles";
import styles from "./App.module.scss";
import {radioClasses} from "@mui/material";

export const muiTheme = createTheme({
    typography: {
        fontFamily: 'Nunito, sans-serif',
    },
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginTop: 4,
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: styles.grey
                }
            }
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: styles.grey,
                    [`&.${radioClasses.checked}`]: {
                        color: styles.secondaryColor,
                    },
                },
            },
        },
    },
});