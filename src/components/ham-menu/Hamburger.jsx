import React, { useContext, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../context/userContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RiSearch2Line } from 'react-icons/ri'

const Hamburger = () => {
    const { user } = useContext(UserContext)
    const path = useLocation().pathname
    const navigateTo = useNavigate();
    const [prompt, setPrompt] = useState('')
    return (
        <div className='hamburger'>
            {user ? <Link className='navlinks' to={"/write"}>Upload</Link> : <Link className='navlinks' to={"/login"}>Login</Link>}
            {user ? <Link className='navlinks' to={`/profile/${user?._id}`}>Profile</Link> : <Link className='navlinks' to={"/register"}>Register</Link>}
            {
                path === "/" && <div className="search1">
                    <input type="text" placeholder='Search something....' onChange={(e) => setPrompt(e.target.value)} />
                    <RiSearch2Line className='search-icon' onClick={() => navigateTo(prompt ? "?search=" + prompt : "/")} />
                </div>
            }
        </div>
    )
}

export default Hamburger
