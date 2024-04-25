import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Table from "./Modules/table.js";

function App() {
  const [projectAssignments, setProjectAssignments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/project_assignments"
        );
        const project_assignments = await response.json();
        console.log("Data fetched");
        console.log(project_assignments);
        setProjectAssignments(project_assignments.project_assignments);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (projectAssignments instanceof Promise) {
    return <p>Loading...</p>;
  }

  if (projectAssignments.length === 0) {
    return <p>No data available</p>;
  }

  return <Table project_assignments={projectAssignments} />;
}

ReactDOM.render(<App />, document.getElementById("index"));
