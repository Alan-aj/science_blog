import React from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import { URL } from "./url";

function View() {
    const { id } = useParams();
    const [data, setData] = React.useState({
        name: "",
        description: "",
        level: "",
        subject: "",
        image: "",
        precautions: ""
    })
    const [materialValue, setMaterialValue] = React.useState([{ item: "", quantity: "" }])
    const [stepValue, setStepValue] = React.useState([{ step_no: "", step_image: "", step_description: "" }])

    React.useEffect(() => {
        axios.post(`${URL}/view`, { id: id }).then((response) => {
            // console.log(response.data)
            if (response.data) {
                setData({ name: response.data.name, description: response.data.description, level: response.data.level, subject: response.data.subject, image: response.data.image, precautions: response.data.precautions })
                setMaterialValue(response.data.materials)
                setStepValue(response.data.instructions)
            }
        });
    }, []);

    return (
        <div className="bg-blue-50 w-full h-full min-h-screen">
            <div className="text-3xl font-bold text-center p-10">
                {data.name}
            </div>
            <div className=" flex flex-col p-3 mx-5 items-center justify-center justify-items-center">
                <div className=" w-full md:w-3/5 lg:w-3/4 bg-white shadow-md rounded-lg  mb-5  ">
                    <div className="flex justify-center">
                        <img
                            className="rounded-t-lg  object-contain h-80 m-2 md:mt-6 lg:mt-6"
                            src={data.image}
                            alt="Could not load image" />
                    </div>
                    <div className=" p-5 lg:p-10 md:p-10">

                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Description</h5>

                        <p className="font-normal text-gray-700 mb-3">{data.description}</p>

                    </div>
                </div>
                <div className=" w-full md:w-3/5 lg:w-3/4 bg-white shadow-md rounded-lg  mb-5 p-5 lg:p-10 md:p-10 ">
                    <div>
                        <h5 className="inline-block text-gray-900 font-bold text-2xl tracking-tight m-2">Difficulty level: </h5>
                        <h5 className="inline-block text-gray-900 text-xl tracking-tight m-2">{data.level} / 5 </h5>
                    </div>
                    <div>
                        <h5 className="inline-block text-gray-900 font-bold text-2xl tracking-tight m-2">Subject: </h5>
                        <h5 className="inline-block text-gray-900 text-xl tracking-tight m-2">{data.subject}</h5>
                    </div>
                    <div>
                        <h5 className="inline-block text-gray-900 font-bold text-2xl tracking-tight m-2">Materials: </h5>
                        <div className=" flex flex-col items-center pb-3">
                            <table className=" w-3/5 text-center">
                                <thead className=" bg-gray-600">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            Material name
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            Quantity
                                        </th>
                                    </tr>
                                </thead >
                                <tbody className="border border-slate-900">

                                    {
                                        materialValue.map((data, key) => (
                                            <tr className="border" key={key}>
                                                <td className="text-sm text-gray-900 px-6 py-4 border">
                                                    {data.item}
                                                </td>
                                                <td className="text-sm text-gray-900 px-6 py-4 border">
                                                    {data.quantity}
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h5 className=" text-gray-900 font-bold text-2xl tracking-tight m-2">Safety precautions: </h5>
                        <h5 className=" text-gray-900 tracking-tight m-2">{data.precautions}</h5>
                    </div>
                </div>
                <div className=" w-full md:w-3/5 lg:w-3/4 bg-white shadow-md rounded-lg  mb-5 p-5 lg:p-10 md:p-10 ">
                    <div>
                        <h5 className=" text-gray-900 font-bold text-2xl tracking-tight m-2">Instructions: </h5>
                        <div className=" flex flex-col items-center p-3">
                            <table className=" w-full text-center">
                                <thead className=" bg-gray-600">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            Step
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            Description
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            Image
                                        </th>
                                    </tr>
                                </thead >
                                <tbody className="border border-slate-900">

                                    {
                                        stepValue.map((data, key) => (
                                            <tr className="border" key={key}>
                                                <td className="text-sm text-gray-900 px-6 py-4 border">
                                                    {data.step_no}
                                                </td>
                                                <td className="text-sm text-gray-900 px-6 py-4 border">
                                                    {data.step_description}
                                                </td>
                                                <td className=" p-0">
                                                    <div className="flex items-center justify-center">
                                                        <img
                                                            className=" object-contain lg:h-60 h-40 "
                                                            src={data.step_image}
                                                            alt="Could not load image" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;