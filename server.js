import express from "express";

const app = express();

app.use(express.static("dist"));
app.use(express.json())

app.get("/employees", (req, res) => {
    
})

app.listen(3000, ()=> {
    console.log("server listen to http://localhost:3000/")
});