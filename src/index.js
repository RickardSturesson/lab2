import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { Table } from "./Modules/table.js";
// import createData from "./Modules/createData.js";

async function createData () {
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

function App() {
  const [projectAssignments, setProjectAssignments] = useState([]);

  useEffect(() => {
      async function fetchData() {
          const data = await createData();
          console.log("THIS IS THE DATA:" + data)
          setProjectAssignments(data);
      }
      fetchData();
  }, []);

    // Kontrollera om projectAssignments är en Promise och rendera en laddningsindikator i så fall
    if (projectAssignments instanceof Promise) {
      return <p>Loading...</p>;
    }
  
    // Kontrollera om projectAssignments är tomt och rendera en meddelande om ingen data finns
    if (projectAssignments.length === 0) {
      return <p>No data available</p>;
    }

  return (
  <Table project_assignments={projectAssignments} />
  );
}

ReactDOM.render(<App />, document.getElementById("index"));