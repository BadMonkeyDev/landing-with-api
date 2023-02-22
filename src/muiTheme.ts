import {createTheme} from "@mui/material/styles";
import styles from "./App.module.scss";
import {radioClasses} from "@mui/material";

export const muiTheme = createTheme({
    typography: {
        fontFamily: 'Nunito, sans-serif',
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    [`&.${'MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline'}`]: {
                        borderColor: styles.grey,
                        borderWidth: 1
                    },
                    [`&.${'MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline'}`]: {
                        borderWidth: 2
                    }
                }
            }
        },
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
                    color: styles.grey,
                    [`&.${'Mui-focused'}`]: {
                        color: styles.grey,
                    },
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