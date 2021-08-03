import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/CommonField/CommonField";


export type CommonFormPropsType = {
    newText: string
}

type FormType = {
    disable?: boolean
    label?: string
}

const Form: React.FC<InjectedFormProps<CommonFormPropsType, FormType> & FormType> = React.memo((props) => {
    const {handleSubmit, disable, label} = props

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="newText" type="text" component={Input} label={label}/>
            </div>
            <div>
                <button disabled={disable} type="submit">Send</button>
            </div>

        </form>
    );
})
export const FieldForm = reduxForm<CommonFormPropsType, FormType>({
    form: "formForSendNewText"
})(Form)