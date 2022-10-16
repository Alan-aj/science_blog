import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { URL } from "./url";

const Login = ({ setLoginid }) => {
    const navigate = useNavigate();
    const [loginData, setUser] = useState({
        name: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...loginData,
            [name]: value
        })
    }

    const adminLogin = () => {
        const { name, password } = loginData
        if (name && password) {
            axios.post(`${URL}/login`, loginData)
                .then(res => {
                    alert(res.data.message)
                    localStorage.setItem("loginId", res.data.user._id)
                    setLoginid(res.data.user._id)
                    navigate("/admin", { replace: true })
                })
        } else {
            alert("Invalid input")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Admin login</h3>
                <div className="mt-4">
                    <div>
                        <label className="block">Username</label>
                        <input type="text" placeholder="Username" name="name" value={loginData.name} onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" />
                    </div>
                    <div className="mt-4">
                        <label className="block">Password</label>
                        <input type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={adminLogin} className="px-6 py-2 mt-4 text-white bg-cyan-700 rounded-lg hover:bg-cyan-900">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login