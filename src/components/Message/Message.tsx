import React from "react";
import {MessageType} from "../../dal/api";

type MessagePropsType = {
    message: MessageType
    className: string
}

export const Message: React.FC<MessagePropsType> = React.memo(({message, className}) => {
    return (
        <div className={className}>
            <b>{message.user.name}: </b> <span>{message.message}</span>
        </div>
    );
})