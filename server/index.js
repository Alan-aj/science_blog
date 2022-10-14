import express from "express";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.get("/", (req,res) => {
    res.send("Hello world")
})

app.listen(9003, () => {
    console.log("Server started at port 9003")
})
