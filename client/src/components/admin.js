import { useNavigate } from "react-router-dom";
import Card from "./adminCard";

function Admin(props) {
    const navigate = useNavigate();

    const logOut = ()=>{
        localStorage.removeItem("loginId")
        // localStorage.clear()
        props.setLoginid(null)
    }

    return (
        <div className="bg-blue-50 w-full h-full min-h-screen">
                <div className="text-3xl p-10 text-center inline-block font-bold">
                    Admin Portal
                </div>
                <div className=" p-5 py-10 float-right">
                    <button onClick={() => navigate("/create")} className=" mx-3 px-2 py-1 text-white text-lg bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg  text-center inline-flex items-center">New experiment</button>
                    <button onClick={logOut} className="mx-3 px-2 py-1 text-white text-lg bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg  text-center inline-flex items-center">Logout</button>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-10 p-3 mx-5 items-center justify-center justify-items-center">
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default Admin;