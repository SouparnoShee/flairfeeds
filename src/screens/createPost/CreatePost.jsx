import React, { useContext, useState } from 'react'
import "./styles.scss"
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/flairfeeds-logo.png"
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { server } from '../../main'
import toast from 'react-hot-toast'

const CreatePost = () => {
    const { user } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const navigateTo = useNavigate();
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
                    console.log(imgupload.data.message.url)
                    post.photo = imgupload.data.message.url
                } catch (error) {
                    console.log("Image cannot be uploaded, due to some error")
                    console.log(error)
                }
            }
            const res = await axios.post(`${server}/posts/create`, post, { withCredentials: true })
            console.log(res.data)
            toast("Post has been successfully uploaded")
            navigateTo('/')
        } catch (error) {
            toast.error('Error occured')

        }

    }
    return (
        <div className='create-post'>
            <div className="head">
                <Link to={"/"}> <img src={logo} alt="" /></Link>
            </div>
            <div className="create-body">
                <h1 className='create-head'>Upload a story of yours.</h1>
                <form onSubmit={submitPost}>
                    <div className="file-input">
                        <h3>Add an image-</h3>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <input type="text" placeholder='Title of the post..' onChange={(e) => setTitle(e.target.value)} />
                    <textarea rows={10} cols={60} type="text" placeholder='Add a description..' onChange={(e) => setDesc(e.target.value)} />
                    <button>Add Post ❤</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
