import { useState, useContext } from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import cartContext from '../../context/cartContext'

import './index.css'

const LoginPage = (props) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({nameError:'', passwordError:'', backendError : ''})
    const [showPassword, changeStatus] = useState(false)
    const [loaderStatus, changeLoadingStatus] = useState(false)

    const userToken = Cookies.get('jwt_token')
    const {getUserDetails} = useContext(cartContext)

    const authenticationSucceed = (data) => {
        const {history} = props
        const token = data.jwt_token
        Cookies.set('jwt_token', token, {expires:30})
        history.replace('/')
    }

    const authenticationFailed = (error) => {
        setErrors({backendError : error})
    }

    const userCanLogin = async  () => {
        changeLoadingStatus(true)
        const userDetails = {name, password}
        const api = 'http://localhost:7000/login'
        const optins = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userDetails)
        }
        const fetchResponse = await fetch(api, optins)
        const fetchData = await fetchResponse.json()
        console.log(fetchData)
        if(fetchResponse.ok){
            authenticationSucceed(fetchData)
            changeLoadingStatus(false)
            getUserDetails(fetchData.user_data)
        }else{
            authenticationFailed(fetchData.error)
            changeLoadingStatus(false)
        }
    }

    const onClickLogin = (e) => {
        e.preventDefault()

        if(name !== "" && password !== ""){
            userCanLogin()
        }

        if(name === '' && password === ''){
            return setErrors({nameError:'name is required', passwordError:'password is required'})
        }

        if(name === ''){
            return setErrors({nameError:'name is required'})
        }

        if(password === ''){
            return setErrors({passwordError:'password is required'})
        }

    }

    const getUserName = (e) => {
        setName(e.target.value)
    }

    const getUserPassword = (e) => {
        setPassword(e.target.value)
    }

    const changeShowPasswordStatus = () => {
        changeStatus(!showPassword)
    }

    const onBlurOnName = () => {
        if(name === ''){
            setErrors({nameError:'name is required'})
        }else{
            setErrors({nameError:''})
        }
    }

    const onBlurOnPassword = () => {
        if(password === ''){
            setErrors({passwordError:'password is required'})
        }else{
            setErrors({passwordError:''})
        }
    }

    const renderLoginUi = () => {
        return (
            <div className='login-container'>
                <h1 className='sign-up-heading'>Hello Again!</h1>
                <form onSubmit={onClickLogin} style={{padding:"20px"}}>
                    <div className="input-field-container">
                        <label className="label" htmlFor="name">Name</label>
                        <input onBlur={onBlurOnName} onChange={getUserName} id="name" className="input-field" type="text" />
                        <p className='error'>{errors.nameError}</p>
                    </div>
                    <div className="input-field-container">
                        <label className="label" htmlFor="password">Password</label>
                        <input onBlur={onBlurOnPassword} onChange={getUserPassword} id="password" className="input-field" type={showPassword ? 'text' : 'password'} />
                        <p className='error'>{errors.passwordError}</p>
                    </div>
                    <div className='show-password-container'>
                        <input onChange={changeShowPasswordStatus} id='checkbox' type='checkbox' className='checkbox' />
                        <label htmlFor='checkbox' className='show-password-label'>Show Password</label>
                    </div>
                    <button className='login-button' type='submit'>{loaderStatus ? <TailSpin color='#ffffff' height='20' width='20' /> : 'Login'}</button>
                    <p className='backend-error'>{errors.backendError}</p>
                    <p className='login-text'>Don't have an account? <Link className="login" to="/signup">Sign up</Link></p>
                </form>
            </div>
        )
    }

    if(userToken !== undefined){
         return <Redirect to='/' />
    }

    return (
        <div className='login-main-container'>
            {renderLoginUi()}
        </div>
    )
}

export default LoginPage