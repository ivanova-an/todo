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
import {CircularProgress, Container} from "@mui/material";
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";


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
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    {isLoggedIn && <Button color="inherit" variant={"outlined"}  onClick={onClickHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path ={'/'} element = {<TodolistsList/>}/>
                    <Route path={'/login'} element = {<Login/>}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}} >404: PAGE NOT FOUND</h1>} />
                    <Route path = '*' element={<Navigate to='/login'/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
