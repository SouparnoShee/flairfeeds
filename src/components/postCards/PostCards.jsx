import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import { BiSolidLike } from "react-icons/bi";
import { BiSolidComment } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IF, server } from '../../main';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import CardComments from '../card-comments/CardComments';




const PostCards = ({ posts }) => {
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const postId = posts?._id

    const { user } = useContext(UserContext)
    const likePost = async () => {
        if (posts?.likePost?.includes(user?.username)) {
            const res = await axios.put(`${server}/posts/unlike/${postId}`, { user: user?.username }, { withCredentials: true })
            window.location.reload()
        } else {
            const res = await axios.put(`${server}/posts/like/${postId}`, { user: user?.username }, { withCredentials: true })
            window.location.reload()
            console.log(res)
        }

    }
    const commentHandler = (postId) => {
        if (!showComments) {
            setShowComments(true);
        } else {
            setShowComments(false)
        }

    }

    const postComment = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/comments/create`, {
                comment: comment,
                author: user?.username,
                postId: postId,
                userId: user?._id,
            }, { withCredentials: true })
            console.log(res.data.message)
            toast.success('Comment has been posted')
            fetchComments()
            setShowComments(false)
        } catch (error) {
            toast.error("Some Error Occured")
        }
    }

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${server}/comments/post/${postId}`, { withCredentials: true })
            setComments(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [postId])
    return (
        <div className='postcards'>
            <div className="img">
                <img src={posts?.photo} alt="" />
            </div>
            <div className="user-info">
                <span className='name-dates'>@{posts?.username}</span>
                <span className='name-dates'>{new Date(posts?.createdAt).toString().slice(0, 15)}</span>
            </div>
            <h2>{posts?.title}</h2>
            <p>{posts?.desc.slice(0, 280)}...</p>
            <div className='likes-view'>
                {
                    showComments ? <div className="comments">
                        <div className='cross'>
                            <RxCross2 className='cross-icon' onClick={() => setShowComments(false)} />
                        </div>
                        <div className="comment-input">
                            <input type="text" placeholder='write-comment' onChange={(e) => setComment(e.target.value)} value={comment} />
                            <IoMdSend className='send' onClick={postComment} />
                        </div>
                        {
                            comments?.map((e) => (
                                <CardComments key={e._id} e={e} />
                            ))
                        }

                    </div> : null
                }
                {
                    user ? <div className="like-comment">
                        <div className="likes">
                            <BiSolidLike className='like' onClick={likePost} />
                            <span className='like-num'>{posts?.likePost.length}</span>
                        </div>
                        <BiSolidComment className='comment' onClick={(e) => commentHandler(e)} />
                    </div> : null
                }


                <Link className='view-post' to={user ? `/post/${posts?._id}` : "/login"}>View Post</Link>
            </div>


        </div>
    )
}

export default PostCards
