import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../../main'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/userContext'
import "./styles.scss"

const Footer = () => {
    const { user, setUser } = useContext(UserContext)
    const navigateTo = useNavigate();
    const logoutHandler = async () => {
        try {
            await axios.get(`${server}/auth/logout`, { withCredentials: true })
            setUser(null)
            navigateTo('/login')
        } catch (error) {
            toast.error("Cannot Log Out")
        }
    }
    return (
        <div className='footer'>
            <span>Crafted by DevSouparno &copy; All reights reserved 2024</span>
            <div className="profile-sec">
                <Link to={`/profile/${user?._id}`} className='profile'>Profile</Link>
                <span className='logout' onClick={logoutHandler}>Logout</span>
            </div>
        </div>
    )
}

export default Footer
