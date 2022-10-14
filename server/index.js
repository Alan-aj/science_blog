import express from "express";
import cors from "cors";
import "./db/models.js";
import mongoose from "mongoose";
import { Admin } from "./db/models.js";

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
            res.send({ message: "Admin not registered" })
        }
    })
})

app.get("/", (req,res) => {
    res.send("Hello world")
})

app.listen(9003, () => {
    console.log("Server started at port 9003")
})
