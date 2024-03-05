import React, { useContext } from 'react'
import "./styles.scss"
import profile from "../../assets/profile.jpg"
import { RxCross2 } from "react-icons/rx";
import { PIF, server } from '../../main';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Status = ({ m }) => {
    const { user } = useContext(UserContext)
    const deleteStatus = async () => {
        try {
            await axios.delete(`${server}/status/${m._id}`, { withCredentials: true })
            toast.success("Status has been deleted")
            window.location.reload()
        } catch (error) {
            toast.error("Some Error Occured")
            console.log(error)
        }

    }
    return (
        <>
            {
                m.userId === user?._id ? <div className='self-status-box'>

                    <div>
                        <div className='user-info'>
                            <img src={m?.photo} alt="" />
                            <div className="name-date">
                                <h3>@{m.username}</h3>
                            </div>
                        </div>
                        <RxCross2 className='cross' onClick={deleteStatus} />
                    </div>
                    <div className='dates'>
                        <p>{new Date(m?.createdAt).toString().slice(0, 15)}</p>
                        <p>{new Date(m?.createdAt).toString().slice(16, 25)}</p>
                    </div>
                    <span>
                        {m?.status}

                    </span>

                </div> : <div className='status-box'>

                    <div>
                        <div className='user-info'>
                            <img src={m?.photo} alt="" />
                            <div className="name-date">
                                <h3>@{m.username}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='dates'>
                        <p>{new Date(m?.createdAt).toString().slice(0, 15)}</p>
                        <p>{new Date(m?.createdAt).toString().slice(16, 25)}</p>
                    </div>
                    <span>
                        {m.status}

                    </span>

                </div>
            }


        </>
    )
}

export default Status
