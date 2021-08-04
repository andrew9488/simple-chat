import React, {useEffect} from 'react';
import styles from './App.module.css';
import {useDispatch} from "react-redux";
import {createChannelTC, destroyChannelTC} from "../../bll/chat-reducer";
import {Header} from "../../components/Header/Header";
import {Routes} from "../../components/Routes/Routes";


export const App: React.FC = React.memo(() => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(createChannelTC())
        return () => {
            dispatch(destroyChannelTC())
        }
    }, [])


    return (
        <div className={styles.App}>
            <Header/>
            <div className={styles.main}>
                <Routes/>
            </div>
            {/*<textarea value={message} onChange={onChangeMessageHandler} onKeyPress={onKeyPressMessageHandler}/>*/}
        </div>
    );
})
