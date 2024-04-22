import mongoose from "mongoose";

const employee_schema = new mongoose.Schema(
    {
        employee_id: {type: String, required: true, unique: true }, 
        full_name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        hashed_password: {type: String, required: true}
    },
    {
        collection: "employee"
    }
)

export default mongoose.model("Employee", employee_schema);