import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import AppWrapper from '../../containers/AppWrapper'
import PostCards from '../../components/postCards/PostCards'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import profilepic from "../../assets/profile.jpg"
import { UserContext } from '../../context/userContext'
import { PIF, server } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import Status from '../../components/status/Status'

const Home = () => {
    const { user, setUser } = useContext(UserContext)
    const navigateTo = useNavigate();
    const [posts, setPosts] = useState([])
    const [noresults, setnoResults] = useState(false);
    const [status, setStatus] = useState('')
    const [allstatus, setAllStatus] = useState([])
    const [nostatus, setNoStatus] = useState(false)
    const { search } = useLocation()
    const logoutHandler = async () => {
        try {
            await axios.get(`${server}/auth/logout`, { withCredentials: true })
            setUser(null)
            navigateTo('/login')
        } catch (error) {
            toast.error("Cannot Log Out")
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [search])

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${server}/posts${search}`, { withCredentials: true })
            setPosts(res.data)
            if (res.data.length === 0) {
                setnoResults(true)
            } else {
                setnoResults(false)
            }
        } catch (error) {
            toast.error('posts cannot be fetched, an error occured')
        }
    }

    const postStatus = async () => {
        try {
            const res = await axios.post(`${server}/status/create`, {
                photo: user?.profilePhoto,
                status: status,
                username: user?.username,
                userId: user?._id,
            }, { withCredentials: true })
            toast.success("Status Successfully posted")
            fetchStatus()
        } catch (error) {
            toast.error("Some Error Occured")
        }
    }
    const fetchStatus = async () => {
        try {
            const res = await axios.get(`${server}/status`, { withCredentials: true })
            setAllStatus(res.data.message)
            if (res.data.message.length === 0) {
                setNoStatus(true)
            } else {
                setNoStatus(false)
            }
        } catch (error) {
            toast.error("Some Error Occured")
        }
    }

    useEffect(() => {
        fetchStatus()
    }, [user?._id])


    return (
        <AppWrapper>
            <div className="home">
                {
                    !noresults ? <div className="left">
                        {
                            posts.map((posts) => {
                                return <PostCards key={posts._id} posts={posts} />

                            })
                        }
                    </div> : <div className='no-results'><h1>No Results found</h1></div>
                }

                <div className="right">
                    {
                        user ? <div className="profile">
                            <div className="profile-pic">
                                <div>
                                    <img src={user?.profilePhoto} alt="" />
                                </div>
                            </div>
                            <div className="user-info">
                                <span>@{user?.username}</span>
                                <span>{user?.email}</span>
                            </div>
                            <div className="view-profile">
                                <Link className='link' to={`/profile/${user?._id}`}>View Profile</Link>
                            </div>
                            <div className="button">
                                <button onClick={logoutHandler}>Logout</button>
                            </div>
                            <Link to={"/write"}>
                                <div className="create-post">
                                    <span>Create Post</span>
                                </div>
                            </Link>
                        </div> : null
                    }


                    <div className="status">
                        {
                            user ? <div className="post-status">
                                <input type="text" placeholder="What's on your mind..." onChange={(e) => setStatus(e.target.value)} value={status} />
                                <button onClick={postStatus}>Post Status</button>
                            </div> : null
                        }

                    </div>
                    {
                        nostatus ? <div className='nostatus'><h2>☹ No status posted so far</h2></div> : <div className='all-status'>
                            {
                                allstatus?.map((m) => (
                                    <Status key={m._id} m={m} />
                                ))
                            }
                        </div>


                    }

                </div>
            </div>
        </AppWrapper>
    )
}

export default Home
