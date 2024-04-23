import mongoose from "mongoose";

const project_assignment_schema = new mongoose.Schema(
    {
        employee_id: {type: String, ref: "Employee", required: true},
        project_code: {type: String, ref: "Project", required: true},
        start_date: {type: Date, required: true}
    },
    {
        collection: "project_assignment"
    }
);

export default mongoose.model("Project_assignment", project_assignment_schema);