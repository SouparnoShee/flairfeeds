import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import AppWrapper from '../../containers/AppWrapper'
import { IoMdSend } from "react-icons/io";
import demo1 from "../../assets/demo1.jpeg"
import { BiSolidLike } from 'react-icons/bi';
import axios from "axios"
import { IF, server } from '../../main';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import PostComments from '../../components/comments-post/PostComments';

const PostDetails = () => {
    const postId = useParams().id
    const [post, setPost] = useState({})
    const { user } = useContext(UserContext)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const navigateTo = useNavigate()


    const fetchPosts = async () => {
        const res = await axios.get(`${server}/posts/${postId}`, { withCredentials: true })
        setPost(res.data.message)
    }

    const deletePost = async () => {
        const res = await axios.delete(`${server}/posts/${postId}`, { withCredentials: true })
        navigateTo("/")
    }
    console.log(post)

    const likePost = async () => {
        if (post?.likePost?.includes(user?.username)) {
            const res = await axios.put(`${server}/posts/unlike/${postId}`, { user: user?.username }, { withCredentials: true })
            window.location.reload()
        } else {
            const res = await axios.put(`${server}/posts/like/${postId}`, { user: user?.username }, { withCredentials: true })
            window.location.reload()
            console.log(res)
        }
    }

    const postComments = async (e) => {
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
        fetchPosts();
    }, [postId, likePost])

    useEffect(() => {
        fetchComments()
    }, [postId])
    return (
        <div>
            <AppWrapper>
                <div className="post-details">
                    <div className="post">
                        <div className="img">
                            <img src={post?.photo} alt="" />
                        </div>
                        <div className="user-info">
                            <span>@{post.username}</span>
                            <span>{new Date(post?.updatedAt).toString().slice(0, 15)}</span>
                        </div>
                        <h1 className='title'>{post.title}</h1>
                        <p className='desc'>{post.desc}</p>
                        <div className="likes">
                            <div className="likes" >
                                <BiSolidLike className='like' onClick={likePost} />
                                <span className='like-num'>{post?.likePost?.length}</span>
                            </div>
                        </div>
                        <div className="comments">
                            <div className="comment-input">
                                <input type="text" placeholder='write-comment' onChange={(e) => setComment(e.target.value)} value={comment} />
                                <IoMdSend className='send' onClick={postComments} />
                            </div>
                            {
                                comments?.map((e) => (
                                    <PostComments key={e._id} e={e} />

                                ))
                            }

                        </div>
                    </div>
                    {
                        user?._id === post.userId ? <div className="edit-delete">
                            <Link to={`/edit/${postId}`}>
                                <button>Edit Post</button>
                            </Link>
                            <button onClick={deletePost}>Delete Post</button>
                        </div> : null
                    }

                </div>
            </AppWrapper>
        </div>
    )
}

export default PostDetails
