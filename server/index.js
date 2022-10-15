import express from "express";
import cors from "cors";
import "./db/models.js";
import mongoose from "mongoose";
import { Admin, Experiment } from "./db/models.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// Routes
app.post("/login", (req, res) => {
    const { name, password } = req.body
    Admin.findOne({ name: name }, (err, data) => {
        if (data) {
            if (password === data.password) {
                res.send({ message: "Login successfull", user: data })
            } else {
                res.send({ message: "Wrong password" })
            }
        } else {
            res.send({ message: "Admin not found" })
        }
    })
})

app.post("/create", (req, res) => {
    const { name } = req.body
    const createData = req.body
    Experiment.findOne({ name: name }, (err, data) => {
        if (data) {
            res.send({ message: "Experiment already exits" })
        } else {
            const experiment = new Experiment(createData)
            experiment.save(err => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({ message: "Experiment added successfully" })
                }
            })
        }
    })
})

app.get("/experiment", (req, res) => {
    Experiment.find({}, function (err, data) {
        if (data) {
            // console.log(data)
            res.send(data)
        } else {
            console.log(err)
        }
    })

})

app.post("/delete", (req, res) => {
    const { id } = req.body
    Experiment.deleteOne({ _id: id })
        .then(function () {
            res.send({ message: "Experiment deleted" })
        }).catch(function (error) {
            console.log(error);
        })
})

app.post("/experimentOne", (req, res) => {
    const { id } = req.body
    Experiment.findOne({ _id: id }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(docs)
        }
    })
})

app.post("/update", (req, res) => {
    const updateData = req.body.data
    // console.log(updateData)
    const { id } = req.body
    // console.log(id)
    Experiment.findByIdAndUpdate(id, {$set: updateData},
        function (err, docs) {
            if (docs) {
                res.send({ message: "Product updated" })
            }
            else {
                res.send({ message: "Update failed" })
                console.log(err)
            }
        });
})

app.post("/view", (req, res) => {
    const { id } = req.body
    Experiment.findOne({ _id: id }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(docs)
        }
    })
})

app.post("/filter", (req, res) => {
    const { subject } = req.body
    Experiment.find({ subject: subject }, function (err, data) {
        if (data) {
            // console.log(data)
            res.send(data)
        } else {
            console.log(err)
        }
    })
})

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(9003, () => {
    console.log("Server started at port 9003")
})
