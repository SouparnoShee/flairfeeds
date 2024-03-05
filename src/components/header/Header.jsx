import React, { useContext, useState } from 'react'
import "./styles.scss"
import logo from "../../assets/flairfeeds-logo.png"
import { RiSearch2Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Hamburger from '../ham-menu/Hamburger';
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";



const Header = () => {
    const { user } = useContext(UserContext);
    const path = useLocation().pathname
    const navigateTo = useNavigate();
    const [prompt, setPrompt] = useState('')
    const [ham, setHam] = useState(false)


    return (
        <div className='header'>
            <Link to={"/"}>
                <img src={logo} alt="" className='logo' />
            </Link>
            {
                path === "/" && <div className="search">
                    <input type="text" placeholder='Search something....' onChange={(e) => setPrompt(e.target.value)} />
                    <RiSearch2Line className='search-icon' onClick={() => navigateTo(prompt ? "?search=" + prompt : "/")} />
                </div>
            }

            <div className="hams">
                <HiOutlineBars3CenterLeft className='bar' onClick={() => setHam(!ham)} />
                <div className="links">
                    {user ? <Link className='navlinks' to={"/write"}>Upload</Link> : <Link className='navlinks' to={"/login"}>Login</Link>}
                    {user ? <Link className='navlinks' to={`/profile/${user?._id}`}>Profile</Link> : <Link className='navlinks' to={"/register"}>Register</Link>}
                </div>
                {
                    ham ? <div className=''>
                        <Hamburger />
                    </div> : null
                }

            </div>
        </div>
    )
}

export default Header
