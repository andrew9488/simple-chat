import {UserType} from "../../dal/api";
import React from "react";

type WritingUserPropsType = {
    user: UserType
    className: string
}

export const WritingUser: React.FC<WritingUserPropsType> = React.memo(({user, className}) => {
    return (
        <div className={className}>
            <b>{user.name}: </b> <span>...</span>
        </div>
    );
})