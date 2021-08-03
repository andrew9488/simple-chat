import React from "react";
import {Card} from "@material-ui/core";
import {useStyles} from "./materialUIstyles";
import {CommonFormPropsType, FieldForm} from "../FieldForm/FieldForm";
import {setClientNameTC} from "../../bll/chat-reducer";
import {reset} from "redux-form";
import {useDispatch} from "react-redux";


export const EnterUserName: React.FC = React.memo(() => {

    const dispatch = useDispatch()

    const onChangeFormNameHandler = (text: CommonFormPropsType) => {
        if (text.newText.trim() !== "") {
            dispatch(setClientNameTC(text.newText))
            dispatch(reset("formForSendNewText"))
        }
    }

    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <FieldForm onSubmit={onChangeFormNameHandler} label="nick name"/>
        </Card>
    );
})