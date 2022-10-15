import React from "react"
import { useNavigate } from "react-router-dom";
import Card from "./homeCard";
import axios from "axios"

function Home() {
    const navigate = useNavigate();
    const [post, setPost] = React.useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:9003/experiment").then((response) => {
            setPost(response.data);
        });
    }, []);

    return (
        <div className="bg-blue-50 w-full h-full min-h-screen">
            <div className="text-3xl font-bold text-center p-10">
                Science Blog
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-10 p-3 mx-5 items-center justify-center justify-items-center">
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