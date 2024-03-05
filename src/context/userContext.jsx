import axios from "axios";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { server } from "../main";






export const UserContext = createContext({});


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const res = await axios.get(`https://flairfeeds-backend.onrender.com/api/v1/auth/refetch`, { withCredentials: true })
            console.log(res.data.user)
            setUser(res.data.user)
        } catch (error) {
            setUser(null)
        }
    }


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}