
const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Admin login</h3>
                <div className="mt-4">
                    <div>
                        <label className="block" for="Username">Username</label>
                        <input type="text" placeholder="Username"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" />
                    </div>
                    <div className="mt-4">
                        <label className="block">Password</label>
                        <input type="password" placeholder="Password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="px-6 py-2 mt-4 text-white bg-cyan-700 rounded-lg hover:bg-cyan-900">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login