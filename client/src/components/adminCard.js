import { useNavigate } from "react-router-dom";
import axios from "axios"

function Card(props) {
    const navigate = useNavigate();
    // console.log(props)
    const id = props.data._id
    const title = props.data.name
    const body = props.data.description

    const deleteExperiment = () => {
        axios.post("http://localhost:9003/delete", { id: id })
            .then(res => {
                alert(res.data.message)
                props.setDel(false)
                navigate("/admin")
            })
    }

    return (
        <div className="bg-white shadow-md rounded-lg  max-w-xs mb-5 hover:shadow-2xl m-3">

            <img
                className="rounded-t-lg bg-cover w-full h-48"
                src={props.data.image}
                alt="Could not load image" />

            <div className="p-5">

                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{title.length > 35 ? `${title.slice(0, 35)}...` : title}</h5>

                <p className="font-normal text-gray-700 mb-3 h-20">{body.length > 80 ? `${body.slice(0, 80)}...` : body}</p>
                <button onClick={() => navigate(`/view/${id}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                    Read more
                </button>
                
                <button onClick={deleteExperiment} className="inline float-right p-3 pr-0 pt-1 text-red-600">Delete</button>
                <button onClick={() => navigate(`/update/${id}`)} className="inline float-right p-3 pt-1 text-green-600">Update</button>
            </div>
        </div>
    );
}

export default Card;

