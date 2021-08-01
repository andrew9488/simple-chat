import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {useStyles} from "./materialUIstyles";
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from "@material-ui/core";

export const Header: React.FC = React.memo(() => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit">
                        Simple chat
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
})