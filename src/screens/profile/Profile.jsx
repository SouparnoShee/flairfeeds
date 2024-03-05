import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import AppWrapper from '../../containers/AppWrapper'
import profile from "../../assets/profile.jpg"
import flairBanner from "../../assets/flairBanner.png"
import ProfilePosts from '../../components/profilePosts/ProfilePosts'
import { UserContext } from '../../context/userContext'
import { PIF, server } from '../../main'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const navigateTo = useNavigate()

    const params = useParams().id
    const fetchUserPost = async () => {
        const res = await axios.get(`${server}/posts/users/${params}`, { withCredentials: true })
        setPosts(res.data.message)

    }
    const editPost = async () => {
        try {
            const res = await axios.put(`${server}/users/${params}`, { username, email }, { withCredentials: true })
            toast.success("Successfully Updated")
        } catch (error) {
            toast.error("Error Occured")
        }
    }

    const getUser = async () => {
        try {
            const res = await axios.get(`${server}/users/${params}`, { withCredentials: true })
            setUserName(res.data.message.username)
            setEmail(res.data.message.email)
        } catch (error) {
            toast.error("Error Occured")
            console.log(error)

        }
    }
    const deleteUser = async () => {
        try {
            const res = await axios.delete(`${server}/users/${params}`, { withCredentials: true })
            toast.success(res.data.message)
            navigateTo("/login")
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    useEffect(() => {
        getUser();
    }, [params])
    useEffect(() => {
        fetchUserPost();
    }, [params])

    return (
        <>
            <AppWrapper>
                <div className="profile">
                    <div className="head">
                        <div className="uppersection">
                            <img src={flairBanner} alt="" />
                        </div>
                        <div className="profile-photo">
                            <img src={user?.profilePhoto} alt="" />
                        </div>
                    </div>
                    <div className="user-info">
                        <h1 className='name'>@{user?.username}</h1>
                        <h3>{user?.email}</h3>
                    </div>
                    <div className="create-post-butt">
                        <Link className='button'>Create Post</Link>
                    </div>
                    <div className="posts">
                        {
                            posts.map((e) => {
                                return <ProfilePosts key={e} e={e} />
                            })
                        }


                    </div>
                    <div className="edit-delete">
                        <button onClick={() => setShowEdit(true)}>Edit Account</button>
                        <button onClick={deleteUser}>Delete Account</button>
                    </div>
                    {
                        showEdit ? <div className="edit-input">
                            <form>
                                <h2>Edit Account:-</h2>
                                <input type="text" placeholder='Enter Username' onChange={(e) => setUserName(e.target.value)} value={username} />
                                <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                                <button onClick={editPost}>Edit Post</button>
                            </form>
                        </div> : null
                    }

                </div>
            </AppWrapper>
        </>

    )
}

export default Profile
