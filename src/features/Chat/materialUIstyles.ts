import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        minHeight: 550,
        width: 350,
    },
    chatBlock: {
        overflowY: "scroll",
        height: 500,
        minWidth: "93%"
    },
    formBlock: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 10,
        position: "relative",
    },
    input: {
        width: "80%"
    },
    button:{
        position: "absolute",
        right: 0
    }
});