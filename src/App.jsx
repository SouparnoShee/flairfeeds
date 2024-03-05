import Home from "./screens/home/Home"
import { Route, Routes } from "react-router-dom"
import Login from "./screens/login/Login"
import Register from "./screens/register/Register"
import { Toaster } from "react-hot-toast"
import PostDetails from "./screens/post/PostDetails"
import CreatePost from "./screens/createPost/CreatePost"
import EditPost from "./screens/editPost/EditPost"
import Profile from "./screens/profile/Profile"

const App = () => {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
