import React from "react";
import {Route, Switch} from "react-router-dom";
import {UserName} from "../UserName/UserName";
import {EnterUserName} from "../EnterUserName/EnterUserName";
import {Chat} from "../../features/Chat/Chat";

export const PATH = {
    USER_NAME: "/",
    ENTER_USER_NAME: "/enter_user_name",
    CHAT: "/chat"
}

export const Routes: React.FC = React.memo(() => {
    return (
        <Switch>
            <Route exact path={PATH.USER_NAME} render={() => <UserName/>}/>
            <Route path={PATH.ENTER_USER_NAME} render={() => <EnterUserName/>}/>
            <Route path={PATH.CHAT} render={() => <Chat/>}/>
        </Switch>
    );
})