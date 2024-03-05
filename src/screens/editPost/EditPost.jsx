import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from "../../assets/flairfeeds-logo.png"
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { server } from '../../main'
import toast from 'react-hot-toast'

const EditPost = () => {
    const postId = useParams().id
    const { user } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const navigateTo = useNavigate();




    const fetchPost = async () => {
        const res = await axios.get(`${server}/posts/${postId}`, { withCredentials: true })
        if (res) {
            setTitle(res?.data?.message?.title)
            setDesc(res?.data?.message?.desc)

        }

    }



    const submitPost = async (e) => {
        e.preventDefault()
        try {
            const post = {
                title,
                desc,
                username: user?.username,
                userId: user?._id,
            }
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('img', filename)
                data.append('file', file)
                // post.photo = filename


                try {
                    const imgupload = await axios.post(`${server}/upload/images`, data)
                    post.photo = imgupload.data.message.url
                } catch (error) {
                    console.log("Image cannot be uploaded, due to some error")
                }
            }
            const res = await axios.put(`${server}/posts/${postId}`, post, { withCredentials: true })
            toast("Post has been successfully uploaded")
            navigateTo(`/post/${res.data.message._id}`)
        } catch (error) {
            toast.error('Error occured')

        }
    }

    useEffect(() => {
        fetchPost()
    }, [postId])
    return (
        <div className='create-post'>
            <div className="head">
                <Link to={"/"}> <img src={logo} alt="" /></Link>
            </div>
            <div className="create-body">
                <h1 className='create-head'>Edit Your Post</h1>
                <form onSubmit={submitPost}>
                    <div className="file-input">
                        <h3>Add an image-</h3>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <input type="text" placeholder='Title of the post..' onChange={(e) => setTitle(e.target.value)} value={title} />
                    <textarea rows={10} cols={60} type="text" placeholder='Add a description..' onChange={(e) => setDesc(e.target.value)} value={desc} />
                    <button>Edit Post ❤</button>
                </form>
            </div>
        </div>
    )
}

export default EditPost

