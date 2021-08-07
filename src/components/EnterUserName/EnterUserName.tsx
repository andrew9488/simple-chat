import React, {ChangeEvent, useState} from "react";
import {Card, TextField} from "@material-ui/core";
import {useStyles} from "./materialUIstyles";
import {setClientNameTC} from "../../bll/chat-reducer";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {PATH} from "../Routes/Routes";
import Button from "@material-ui/core/Button";


export const EnterUserName: React.FC = React.memo(() => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        setError(false)
    }

    const onClickNameHandler = () => {
        if (name.trim() !== "") {
            dispatch(setClientNameTC(name))
            history.push(PATH.CHAT)
            setName("")
        } else {
            setError(true)
        }
    }

    const messageError = error ? "Please enter your nick name" : ""

    return (
        <Card className={classes.root}>
            <TextField className={classes.input} value={name} id="nick name" label="nick name"
                       color={error ? "secondary" : "primary"}
                       onChange={onChangeNameHandler} helperText={messageError} onBlur={()=>setError(false)}/>
            <Button disabled={error} variant="contained" color="primary" onClick={onClickNameHandler} size="small">
                Send Name
            </Button>
        </Card>
    );
})