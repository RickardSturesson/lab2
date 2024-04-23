import mongoose from "mongoose";

const project_schema = new mongoose.Schema(
    {
        project_code: {type: String, required: true, unique: true},
        project_name: {type: String, required: true},
        project_description: {type: String, required: true}
    },
    {collection: "project"}
);

export default mongoose.model("Project", project_schema);

