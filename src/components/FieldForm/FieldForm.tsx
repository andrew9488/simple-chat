import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/CommonField/CommonField";
import {Button} from "@material-ui/core";
import styles from "./FieldForm.module.css";


export type CommonFormPropsType = {
    newText: string
}

type FormType = {
    writingMessage?: () => void
    disable?: boolean
    label?: string
}

const Form: React.FC<InjectedFormProps<CommonFormPropsType, FormType> & FormType> = React.memo((props) => {
    const {handleSubmit, disable, label, writingMessage} = props

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer} onKeyPress={()=>writingMessage&&writingMessage()}>
            <div className={styles.inputBlock}>
                <Field name="newText" type="text" component={Input} label={label}/>
            </div>
            <div className={styles.submitBlock}>
                <Button variant="contained" color="primary" size="medium" disabled={disable} type="submit">Send</Button>
            </div>

        </form>
    );
})
export const FieldForm = reduxForm<CommonFormPropsType, FormType>({
    form: "formForSendText"
})(Form)