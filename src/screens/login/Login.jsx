import React, { useContext, useState } from 'react'
import "./styles.scss"
import logo from "../../assets/flairfeeds-logo.png"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../../main'
import { UserContext } from '../../context/userContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)
    const navigateTo = useNavigate();
    const signinHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/auth/login`, { email, password }, { withCredentials: true })
            toast.success(res.data.message)
            setUser(res.data)
            navigateTo("/")
            window.location.reload()
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    return (
        <div className='login'>
            <div className="auth-head">
                <Link to={"/"}>
                    <img src={logo} alt="" className="logo" /></Link>
                <Link className='link' to={"/register"}>Register</Link>
            </div>
            <div className="login-body">
                <form className='login-form' onSubmit={signinHandler}>
                    <h1>Login to Your Flairfeeds account</h1>

                    <input className='input' type="email" placeholder='Your Email...' onChange={(e) => setEmail(e.target.value)} />
                    <input className='input' type="password" placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign-In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
