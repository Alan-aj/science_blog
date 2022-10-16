import React from "react"
import Card from "./homeCard";
import axios from "axios"
import { URL } from "./url";

function Home() {
    const [post, setPost] = React.useState([]);
    const [subject, setSubject] = React.useState("");
    React.useEffect(() => {
        axios.get(`${URL}/experiment`).then((response) => {
            setPost(response.data);
        });
    }, []);

    const handleChange = e => {
        setSubject(e.target.value)
    }

    const handleFilter = () => {
        if (subject) {
            if (subject === "All") {
                axios.get(`${URL}/experiment`).then((response) => {
                    setPost(response.data);
                });
            } else {
                axios.post(`${URL}/filter`, {subject: subject}).then(response => {
                    setPost(response.data)
                })
            }
        }
    }

    return (
        <div className=" bg-blue-50 w-full h-full min-h-screen">
            <div className="text-3xl p-10 text-center md:inline-block font-bold sm:block sm:items-center">
                Science Blog
            </div>
            <div className="flex justify-center items-center md:block md:items-center p-5 lg:float-right md:float-right">
                <select name="subject" value={subject} onChange={handleChange} className=" px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" required>
                    <option value="none" hidden >Select an Option</option>
                    <option value="All">All</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="General Science">General Science</option>
                </select>
                <button onClick={handleFilter} className="mx-3 px-2 py-1 text-white text-lg bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg  text-center">Filter</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-5 p-3 mx-5 items-center justify-center justify-items-center">
                {
                    post.map((data) => (
                        <Card key={data._id} data={data} />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;