import React from "react";
import {Card} from "@material-ui/core";
import {useStyles} from "./materialUIstyles";
import { FieldForm, CommonFormPropsType} from "../FieldForm/FieldForm";
import {setClientNameTC} from "../../bll/chat-reducer";
import {reset} from "redux-form";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {PATH} from "../Routes/Routes";


export const EnterUserName: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()

    const onChangeFormNameHandler = (text: CommonFormPropsType) => {
        debugger
        if (text.newText?.trim() !== "") {
            dispatch(setClientNameTC(text.newText))
            dispatch(reset("formForSendName"))
            history.push(PATH.CHAT)
        }
    }


    return (
        <Card className={classes.root}>
            <FieldForm onSubmit={onChangeFormNameHandler} label="nick name"/>
        </Card>
    );
})