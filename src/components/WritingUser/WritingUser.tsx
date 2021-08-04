import {UserType} from "../../dal/api";
import React from "react";

type WritingUserPropsType = {
    user: UserType
}

export const WritingUser: React.FC<WritingUserPropsType> = React.memo(({user}) => {
    return (
        <div>
            <b>{user.name}: </b> <span>...</span>
        </div>
    );
})