import React from "react";
import {MessageType} from "../../dal/api";

type MessagePropsType = {
    message: MessageType
}

export const Message: React.FC<MessagePropsType> = React.memo(({message}) => {
    return (
        <div>
            <b>{message.user.name}: </b> <span>{message.message}</span>
            <hr/>
        </div>
    );
})