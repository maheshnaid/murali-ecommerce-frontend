import { useState } from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

import { PiEyeClosed, PiEye } from "react-icons/pi"
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

import './index.css'

const LoginPage = (props) => {
    const [userCredentials, setUserCredentials] = useState({username:'', password:''})
    const [errors, setErrors] = useState({nameError:'', passwordError:'', backendError:''})
    const [showPassword, changeStatus] = useState(false)
    const [loaderStatus, changeLoadingStatus] = useState(false)

    const userToken = Cookies.get('jwt_token')
    const authenticationSucceed = (data) => {
        const {history} = props
        const token = data.accessToken
        Cookies.set('jwt_token', token, {expires:30})
        history.replace('/')
    }

    const authenticationFailed = (error) => {
        setErrors({...errors, backendError:error.message})
    }

    const userCanLogin = async  () => {
        changeLoadingStatus(true)
        const userDetails = {username:userCredentials.username.toLocaleLowerCase(), password:userCredentials.password.toLocaleLowerCase()}
        const api = 'https://dummyjson.com/auth/login'
        const optins = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userDetails)
        }
        const fetchResponse = await fetch(api, optins)
        const fetchData = await fetchResponse.json()
        
        if(fetchResponse.ok){
            authenticationSucceed(fetchData)
            changeLoadingStatus(false)
        }else{
            authenticationFailed(fetchData)
            changeLoadingStatus(false)
        }
    }

    const getUserName = (e) => {
        setUserCredentials({...userCredentials, username:e.target.value})
    }

    const getUserPassword = (e) => {
        setUserCredentials({...userCredentials, password:e.target.value})
    }

    const onClickLogin = (e) => {
        e.preventDefault()

        const {username, password} = userCredentials

        if(username !== "" && password !== ""){
            userCanLogin()
        }

        if(username === ''){
            setErrors({...errors, nameError:'*Required'})
        }

        if(password === ''){
            setErrors({...errors, passwordError:'*Required'})
        }

        if(username === '' && password === ''){
            setErrors({...errors, nameError:'*Required', passwordError:'*Required'})
        }

    }


    const changeShowPasswordStatus = () => {
        changeStatus(!showPassword)
    }

    const onBlurOnName = () => {
        const {username} = userCredentials
        if(username === ''){
            setErrors({nameError:'*Required'})
        }else{
            setErrors({nameError:''})
        }
    }

    const onBlurOnPassword = () => {
        const {password} = userCredentials
        if(password === ''){
            setErrors({passwordError:'*Required'})
        }else{
            setErrors({passwordError:''})
        }
    }
    

    const renderLoginUi = () => {
        return (
            <div className='login-page-container'>
                <div className='login-container'>
                    <h1 className='login-heading'>Welcome.!</h1>
                    <form onSubmit={onClickLogin} style={{padding:"20px"}}>
                        <div className="input-field-container">
                            <div className='label-icon-con'>
                                <FaUser className='label-icon' />
                                <label className="input-label" htmlFor="name">Name</label>
                            </div>
                            <input autoFocus onBlur={onBlurOnName} onChange={getUserName} id="name" className="input-field" type="text" />
                            <p className='error'>{errors.nameError}</p>
                        </div>
                        <div className="input-field-container">
                            <div className='label-icon-con'>
                                <RiLockPasswordFill className='label-icon' />
                                <label className="input-label" htmlFor="password">Password</label>
                            </div>
                            <div className='eye-input-container'>
                                <input onBlur={onBlurOnPassword} onChange={getUserPassword} id="password" className="password-input" type={showPassword ? 'text' : 'password'} />
                                {userCredentials.password.length > 0 && <button type='button' onClick={changeShowPasswordStatus} className='showpassword-button'>{showPassword ? <PiEye className='eye-icon' /> : <PiEyeClosed className='eye-icon' />}</button>}
                            </div>
                            <p className='error'>{errors.passwordError}</p>
                        </div>
                        <button className='login-button' type='submit'>{loaderStatus ? <TailSpin color='#ffffff' height='20' width='20' /> : 'Login'}</button>
                        <p className='backend-error'>{errors.backendError}</p>
                    </form>
                </div>
            </div>
        )
    }

    if(userToken !== undefined){
         return <Redirect to='/' />
    }

    return (
        <div>
            {renderLoginUi()}
        </div>
    )
}

export default LoginPage