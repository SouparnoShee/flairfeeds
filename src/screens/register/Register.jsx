import React, { useContext, useState } from 'react'
import "./styles.scss"
import logo from "../../assets/flairfeeds-logo.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { server } from '../../main'
import toast from "react-hot-toast"
import { UserContext } from '../../context/userContext'

const Register = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const navigateTo = useNavigate();
    const { setUser } = useContext(UserContext)

    const submitHandler = async (e) => {
        e.preventDefault();
        const register = {
            username,
            email,
            password,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('img', filename)
            data.append('file', file)
            // register.profilePhoto = filename

            try {
                const imgupload = await axios.post(`${server}/upload/profile`, data)
                console.log(imgupload.data)
                register.profilePhoto = imgupload.data.message.url
            } catch (error) {
                toast.error("Some error Occured")
            }
        }
        try {
            const res = await axios.post(`${server}/auth/register`, register, { withCredentials: "true" })
            toast.success(res.data.message)
            setUser(res.data)
            navigateTo("/")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='register'>
                <div className="auth-head">
                    <Link to={"/"}>
                        <img src={logo} alt="" className="logo" />
                    </Link>
                    <Link className='link' to={"/login"}>Login</Link>
                </div>
                <div className="register-body">
                    <form className='register-form' onSubmit={submitHandler}>
                        <h1>Register to Flairfeeds </h1>
                        <label >Upload Profile Photo - </label>
                        <input type="file" className='file-input' onChange={(e) => setFile(e.target.files[0])} />

                        <input className='input' type="text" placeholder='Your UserName...' onChange={(e) => setUserName(e.target.value)} value={username} />
                        <input className='input' type="email" placeholder='Your Email...' onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input className='input' type="password" placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button>Sign-Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
