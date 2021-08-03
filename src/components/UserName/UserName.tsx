import React from "react";
import {useStyles} from "./materialUIstyles";
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import {PATH} from "../Routes/Routes";

export const UserName: React.FC = React.memo(() => {
    const classes = useStyles()
    const history = useHistory()

    const onClickWantEnterName = () => {
        history.push(PATH.ENTER_USER_NAME)
    }
    const onClickCancelEnterName = () => {
        history.push(PATH.CHAT)
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Would you like entering your nickname?
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="medium" onClick={onClickWantEnterName}>Yes</Button>
                <Button variant="contained" color="secondary" size="medium" onClick={onClickCancelEnterName}>No</Button>
            </CardActions>
        </Card>
    );
})