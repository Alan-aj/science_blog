import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios"

function Create() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        description: "",
        level: "",
        subject: "",
        image: "",
        precautions: ""
    })
    const [materialValue, setMaterialValue] = useState([{ item: "", quantity: "" }])
    const [stepValue, setStepValue] = useState([{ step_no: "", step_image: "", step_description: "" }])

    const handleChange = e => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
        // console.log(data)
    }

    const handleMaterial = (i, e) => {
        let newMaterialValues = [...materialValue];
        newMaterialValues[i][e.target.name] = e.target.value;
        setMaterialValue(newMaterialValues)
    }

    const addMaterial = () => {
        setMaterialValue([...materialValue, { item: "", quantity: "" }])
    }

    const removeMaterialFields = (i) => {
        let newMaterialValues = [...materialValue];
        newMaterialValues.splice(i, 1);
        setMaterialValue(newMaterialValues)
    }

    const handleStep = (i, e) => {
        let newStepValues = [...stepValue];
        newStepValues[i][e.target.name] = e.target.value;
        setStepValue(newStepValues)
    }

    const addStep = () => {
        setStepValue([...stepValue, { step_no: "", step_image: "", step_description: "" }])
    }

    const removeStepFields = (i) => {
        let newStepValues = [...stepValue];
        newStepValues.splice(i, 1);
        setStepValue(newStepValues)
    }

    const dataSubmit = () => {
        const { name, description, level, subject, image, precautions } = data
        data.materials = materialValue
        data.instructions = stepValue
        // console.log(data)
        if (name && description && level && subject && image && precautions) {
            axios.post("http://localhost:9003/create", data)
                .then(res => {
                    alert(res.data.message)
                    navigate("/admin")
                })
            // console.log(data)
        } else {
            alert("Invalid input")
        }
    }

    return (
        <div className="bg-blue-50 w-full h-full min-h-screen">
            <div className="text-3xl p-10 text-center inline-block font-bold">
                Admin Portal
            </div>
            <div className=" p-5 py-10 float-right">
                <button
                    onClick={() => navigate("/admin")}
                    className=" mx-3 px-2 py-1 text-white text-lg bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg  text-center inline-flex items-center"
                >Back</button>
            </div>
            <div className="flex items-center justify-center ">
                <div className="px-8 py-6 my-5 text-left bg-white shadow-lg w-2/4">
                    <h3 className="text-2xl font-bold text-center">New experiment</h3>
                    <div className="mt-4">

                        <div className="mt-4">
                            <label className="block">Experiment name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                                value={data.name}
                                onChange={handleChange} required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Short description</label>
                            <textarea
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Difficulty level</label>
                            <select name="level" value={data.level} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" required>
                                <option value="none" hidden >Select an Option</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block">Subject</label>
                            <select name="subject" value={data.subject} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" required>
                                <option value="none" hidden >Select an Option</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="General Science">General Science</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block">Image link</label>
                            <input
                                type="text"
                                placeholder="Image"
                                name="image"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                                value={data.image}
                                onChange={handleChange} required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Materials</label>
                            {materialValue.map((element, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Material name"
                                        name="item" className="w-2/5 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                                        value={element.item}
                                        onChange={e => handleMaterial(index, e)} required
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Quantity"
                                        name="quantity"
                                        className="w-2/5 px-4 py-2 mx-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                                        value={element.quantity}
                                        onChange={e => handleMaterial(index, e)} required
                                    />
                                    {
                                        index ?
                                            <button className="px-3 py-0.5 mt-2 border border-cyan-600 rounded-md hover:bg-cyan-600 hover:text-white " onClick={() => removeMaterialFields(index)}>Remove</button>
                                            : null
                                    }
                                </div>
                            ))}

                            <button onClick={addMaterial} className=" px-3 py-0.5 mt-2 border border-cyan-600 rounded-md hover:bg-cyan-600 hover:text-white text-2xl" >+</button>
                        </div>
                        <div className="mt-4">
                            <label className="block">Safety precautions</label>
                            <textarea
                                name="precautions"
                                value={data.precautions}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Instructions</label>
                            {stepValue.map((element, index) => (
                                <div key={index}>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Step number"
                                        name="step_no"
                                        className="w-4/12 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                                        value={element.step_no}
                                        onChange={e => handleStep(index, e)} required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Image link"
                                        name="step_image"
                                        className="w-7/12 px-4 py-2 mx-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                                        value={element.step_image}
                                        onChange={e => handleStep(index, e)} required
                                    />
                                    <textarea name="step_description" placeholder="Step description" value={element.step_description} onChange={e => handleStep(index, e)} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600" required />
                                    {
                                        index ?
                                            <button className="px-3 py-0.5 mb-2 border border-cyan-600 rounded-md hover:bg-cyan-600 hover:text-white " onClick={() => removeStepFields(index)}>Remove</button>
                                            : null
                                    }
                                </div>
                            ))}

                            <button onClick={addStep} className=" px-3 py-0.5 mt-2 border border-cyan-600 rounded-md hover:bg-cyan-600 hover:text-white text-2xl" >+</button>
                        </div>

                        <div className="flex items-center justify-center">
                            <button type="submit" onClick={dataSubmit} className="px-6 py-2 mt-4 text-white bg-cyan-700 rounded-lg hover:bg-cyan-900">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;