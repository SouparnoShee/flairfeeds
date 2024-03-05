import React, { useContext } from 'react'
import "./styles.scss"
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';

const PostComments = ({ e }) => {
    const { user } = useContext(UserContext)
    const deletePost = async () => {
        try {
            const res = await axios.delete(`${server}/comments/${e._id}`, { withCredentials: true })
            toast.success("Comment has been deleted successfully")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="all-comments" >
            <div className="comment">
                <span className='comment-user'>{e.author}</span>
                <div className='c-text'>
                    <span>{e.comment}</span>
                    {
                        user?._id === e?.userId ? <MdDelete onClick={deletePost} /> : null
                    }

                </div>
            </div>
        </div>
    )
}

export default PostComments
