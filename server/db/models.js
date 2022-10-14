import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: 'config.env' })
const DB = process.env.MONGO_URI

// db connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Db connected")
}).catch((error) => {
    console.log(error.message)
    console.log("Db not connected")
})

// schemas
const adminSchema = new mongoose.Schema({
    name: String,
    password: String
})

// models
export const Admin = new mongoose.model("Admin", adminSchema)