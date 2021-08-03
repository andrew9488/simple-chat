import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
    root: {
        width: 600,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
    },
});