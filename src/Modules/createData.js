export default async function () {
    try{
        const response = await fetch("http://localhost:3000/api/project_assignments");
        const project_assignments = await response.json();
        console.log("Data fetched")
        console.log(project_assignments);
        return project_assignments;
    } catch(error){
        console.error("Error fetching data", error);
    }
};