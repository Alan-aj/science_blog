import { useNavigate } from "react-router-dom";
import Card from "./card";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-50 w-full h-full min-h-screen">
            <div className="text-3xl text-center p-10">
                Home
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-10 p-3 mx-5 items-center justify-center justify-items-center">
                <Card />
            </div>
        </div>
    );
}

export default Home;