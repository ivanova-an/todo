import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";


function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'unset'}}><Typography
                        variant={"h6"}>Todolists</Typography></Link>
                    {isLoggedIn &&
                        <Button color={"inherit"} variant={"outlined"} onClick={onClickHandler}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
            <div style={{height: "10px"}}>
                {status === "loading" && <LinearProgress/>}
            </div>
            <Routes>
                <Route path='/' element={<TodolistsList/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>
            <ErrorSnackbar/>
        </>
    )
}

export default App
