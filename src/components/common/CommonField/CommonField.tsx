import React from "react";
import {WrappedFieldProps} from "redux-form";
import {TextField} from "@material-ui/core";

export const Input: React.FC<WrappedFieldProps> = React.memo((props) => {
    const {input, meta, children, ...restProps} = props
    return <TextField {...props}><input {...input} {...restProps}/></TextField>
})
