import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import { BiSolidLike } from "react-icons/bi";
import { BiSolidComment } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IF, server } from '../../main';
import { RxCross2 } from "react-icons/rx";
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import CardComments from '../card-comments/CardComments';





const ProfilePosts = ({ e }) => {
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const postId = e?._id
    const { user } = useContext(UserContext)
    const likePost = async () => {
        if (e?.likePost?.includes(user?.username)) {
            const res = await axios.put(`${server}/posts/unlike/${postId}`, { user: user?.username }, { withCredentials: true })
            window.location.reload()
        } else {
            const res = await axios.put(`${server}/posts/like/${postId}`, { user: user?.username }, { withCredentials: true })
            window.location.reload()
            console.log(res)
        }

    }
    const commentHandler = () => {
        if (!showComments) {
            setShowComments(true);
        } else {
            setShowComments(false)
        }

    }

    const postComment = async () => {

        try {
            const res = await axios.post(`${server}/comments/create`, {
                comment: comment,
                author: user?.username,
                postId: postId,
                userId: user?._id,
            }, { withCredentials: true })
            console.log(res.data.message)
            toast.success('Comment has been posted')
            // fetchComments()
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
                <img src={e?.photo} alt="" />
            </div>
            <div className="user-info">
                <span className='name-dates'>@{e?.username}</span>
                <span className='name-dates'>{new Date(e?.createdAt).toString().slice(0, 15)}</span>
            </div>
            <h2>{e?.title}</h2>
            <p>{e?.desc.slice(0, 240)}</p>
            <div className='likes-view'>
                {
                    showComments ? <div className="comments">
                        <div className='cross'>
                            <RxCross2 className='cross-icon' onClick={() => setShowComments(false)} />
                        </div>
                        <div className="comment-input" onChange={(a) => setComment(a.target.value)}>
                            <input type="text" placeholder='write-comment' />
                            <IoMdSend className='send' onClick={postComment} />
                        </div>
                        {
                            comments?.map((e) => (
                                <CardComments key={e._id} e={e} />
                            ))
                        }
                    </div> : <div className="like-comment">
                        <div className="likes">
                            <BiSolidLike className='like' onClick={likePost} />
                            <span className='like-num'>{e?.likePost?.length}</span>
                        </div>
                        <BiSolidComment className='comment' onClick={(e) => commentHandler(e)} />
                    </div>
                }

                <Link className='view-post' to={`/post/${e?._id}`}>View Post</Link>
            </div>


        </div>
    )
}

export default ProfilePosts
