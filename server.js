import express from "express";
import Employee from "./Models/Employee.js"
import Project from "./Models/Project.js"
import Project_assignment from "./Models/Project_assignment.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const uri = process.env.URI;
connectToMongo();

app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({employees: employees})        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
    
});

app.post("/api/employees", async (req, res) => {
    const new_employee = new Employee({
        employee_id: req.body.employee_id, 
        full_name: req.body.full_name,
        email: req.body.email,
        hashed_password: req.body.hashed_password
    });
    try {
        await new_employee.save();
        res.status(201).json({message: new_employee});
        console.log("New employee created");        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

app.post("/api/projects", async (req, res) => {
    const new_project = new Project({
        project_code: req.body.project_code,
        project_name: req.body.project_name,
        project_description: req.body.project_description
    });
    try {
        await new_project.save();
        res.status(201).json({message: new_project});
        console.log("New project created");        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

app.post("/api/project_assignments", async (req, res) => {
    const new_project_assignment = new Project_assignment({
        employee_id: req.body.employee_id,
        project_code: req.body.project_code,
        start_date: new Date().toLocaleDateString()
    })
    try {
        await new_project_assignment.save();
        console.log("New project assignment created")
        res.status(201).json({message: new_project_assignment})        
    } catch (error) {        
        console.error(error);
        res.status(500).json({message: "Server error"});        
    }
})

app.get("/api/project_assignments", async (req, res) => {
    try {
        const project_assignments = await Project_assignment.aggregate([
            {
                $lookup: {
                    from: 'employee',
                    localField: 'employee_id',
                    foreignField: 'employee_id',
                    as: 'employee'
                    }
                },
                {
                    $unwind: "$employee"
                },
                {$lookup: {
                    from: 'project',
                    localField: 'project_code',
                    foreignField: 'project_code',
                    as: 'project'
                    }
                },
                {
                    $unwind: "$project"
                },
                {$project: 

                    {
                        employee_id: "$employee.employee_id",
                        employee_name: "$employee.full_name",
                        project_name: "$project.project_name",
                        start_date: 1
                    }
                }
        ]);
        console.log(project_assignments);
        res.json({project_assignments: project_assignments});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');        
    }
});

app.listen(port, ()=> {
    console.log(`server listen to http://localhost:${port}/`)
});

async function connectToMongo() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB")
    } catch(error) {
        console.error("Connection to MongoDB failed", error)
    }
}