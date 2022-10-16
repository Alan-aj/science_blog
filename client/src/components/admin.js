import React from "react"
import { useNavigate } from "react-router-dom";
import Card from "./adminCard";
import axios from "axios"
import { URL } from "./url";

function Admin(props) {
    const navigate = useNavigate();
    const [post, setPost] = React.useState([]);
    const [del, setDel] = React.useState(true);
    React.useEffect(() => {
        axios.get(`${URL}/experiment`).then((response) => {
            setPost(response.data);
        });
        setDel(true)
    }, [del]);

    const logOut = () => {
        localStorage.removeItem("loginId")
        // localStorage.clear()
        props.setLoginid(null)
    }

    return (
        <div className="bg-blue-50 w-full h-full min-h-screen">
            <div className="text-3xl p-10 text-center md:inline-block font-bold sm:block sm:items-center">
                Admin Portal
            </div>
            <div className="flex justify-center items-center md:block md:items-center p-5 py-10 lg:float-right md:float-right">
                <button onClick={() => navigate("/create")} className=" mx-3 px-2 py-1 text-white text-lg bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg  text-center inline-flex items-center">New experiment</button>
                <button onClick={logOut} className="mx-3 px-2 py-1 text-white text-lg bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg  text-center inline-flex items-center">Logout</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-5 p-3 mx-5 items-center justify-center justify-items-center">
                {
                    post.map((data) => (
                        <Card key={data._id} data={data} setDel={setDel} />
                    ))
                }
            </div>
        </div>
    );
}

export default Admin;