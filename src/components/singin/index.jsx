import { Component } from "react"

import { Link } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import './index.css'

class Signup extends Component{

    state = {
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        nameError:'',
        emailError:'',
        passwordError:'',
        confirmPasswordError:'',
        backendError:'',
        loaderStatus:false,
        showPassword:false
    }

    getUserName = (e) => {
        this.setState({name:e.target.value})
    }

    getUserEmail = (e) => {
        this.setState({email:e.target.value})
    }

    getUserPassword = (e) => {
        this.setState({password:e.target.value})
    }

    getUserConfirmPassword = (e) => {
        this.setState({confirmPassword:e.target.value})
    }

    onBlurOnName = () => {
        const {name} = this.state
        if(name === ''){
            this.setState({nameError:'Username required'})
        }else{
            this.setState({nameError:''})
        }
    }

    onBlurOnEmail = () => {
        const {email} = this.state

        if(email === ''){
            this.setState({emailError:'Email is required'})
        }else{
            this.setState({emailError:''})
        }
    }

    onBlurOnPassword = () => {
        const {password} = this.state

        if(password === ''){
            this.setState({passwordError:'Password is required'})
        }else{
            this.setState({passwordError:''})
        }
    }

    onBlurOnConfirmPassword = () => {
        const {confirmPassword} = this.state

        if(confirmPassword === ''){
            this.setState({confirmPasswordError:'Confirm password is required'})
        }else{
            this.setState({confirmPasswordError:''})
        }
    }

    signupSuccess = () => {
        const {history} = this.props 
        history.replace('/login')
    }

    signupFailed = (errors) => {
        console.log(errors)
        this.setState({
            emailError:errors.email_error,
            passwordError:errors.password_error
        })
    }


    allClearSignupUser = async () => {
        this.setState({loaderStatus:true})
        const {name, email, password} = this.state
        const registerApi = 'https://your-backend-name.onrender.com/register'
        const userDetails = {username:name, email, password}
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userDetails)
        }
        const signupRes = await fetch(registerApi, options)
        const signupResult = await signupRes.json()
        console.log(signupResult)
        if(signupRes.ok){
            this.signupSuccess()
        }else{
            this.signupFailed(signupResult.errors)
            this.setState({loaderStatus:false})
        }
    }

    doFormValidation = () => {
        const {name, email, password, confirmPassword} = this.state

        if(name === ""){
            this.setState({nameError:'Username is required'})
        }else{
            this.setState({nameError:''})
        }

        if(email === ""){
            this.setState({emailError:'Email is required'})
        }else{
            this.setState({emailError:''})
        }

        if(password === ""){
            this.setState({passwordError:'password is required'})
        }else{
            this.setState({passwordError:''})
        }

        if(confirmPassword === ""){
            this.setState({confirmPasswordError:'Confirm password is required'})
        }else{
            if(password !== confirmPassword){
                this.setState({confirmPasswordError:'Password did not match'})
            }else{
                this.setState({confirmPasswordError:''})
            }
        }


        if(name !== "" && email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword){
            this.allClearSignupUser()
        }

    }


    signupUser = (e) => {
        e.preventDefault()
        this.doFormValidation()
    }

    onClickShowPassword = () => {
        this.setState(prevState => ({
            showPassword:!prevState.showPassword
        }))
    }

    renderSignupView = () => {
        const {nameError, emailError, passwordError, password, confirmPasswordError, loaderStatus, showPassword} = this.state

        return (
            <div className="sign-up-container">
                <h1 className="sign-up-heading">Welcome!</h1>
                    <form onSubmit={this.signupUser} style={{padding:"20px"}}>
                        <div className="input-field-container">
                            <label className="label" htmlFor="name">Name</label>
                            <input onBlur={this.onBlurOnName} onChange={this.getUserName} id="name" className="signup-input-field" type="text" />
                            <p className='error'>{nameError}</p>
                        </div>
                        <div className="input-field-container">
                            <label className="label" htmlFor="email">Email</label>
                            <input onBlur={this.onBlurOnEmail} onChange={this.getUserEmail} id="email" className="signup-input-field" type="mail" />
                            <p className='error'>{emailError}</p>
                        </div>
                        <div className="input-field-container">
                            <label className="label" htmlFor="password">Password</label>
                            <div className="password-container">
                                <input onBlur={this.onBlurOnPassword} onChange={this.getUserPassword} id="password" className="signup-input-field" type={showPassword ? 'text' : 'password'} />
                                {password.length > 0 && <button type="button" onClick={this.onClickShowPassword} className="eye-button">{showPassword ? <IoIosEyeOff className="eye-icon" /> : <IoIosEye className="eye-icon" />}</button>}
                            </div>
                            <p className='error'>{passwordError}</p>
                        </div>
                        <div className="input-field-container">
                            <label className="label" htmlFor="confirm-password">Confirm Password</label>
                            <input onBlur={this.onBlurOnConfirmPassword} onChange={this.getUserConfirmPassword} id="confirm-password" className="signup-input-field" type="password" />
                            <p className='error'>{confirmPasswordError}</p>
                        </div>
                        <button className="sign-up-button" type="submit">{loaderStatus ? <TailSpin color='#ffffff' height='20' width='20' /> : 'Signup'}</button>
                        <p className="login-text">Already have an account? <Link className="login-link" to="/login">Login</Link></p>
                    </form>
            </div>
        )
    }

    render(){
        return (
            <div className="signup-main-container">
                {this.renderSignupView()}
            </div>
        )
    }
}

export default Signup