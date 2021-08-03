import React from "react";
import {useStyles} from "./materialUIstyles";
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const UserName: React.FC = React.memo(() => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Would you like entering your nickname?
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="medium">Yes</Button>
                <Button variant="contained" color="secondary" size="medium">No</Button>
            </CardActions>
        </Card>
    );
})