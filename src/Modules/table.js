import React from "react";

export async function Table ({project_assignments}) {
    if (!project_assignments || project_assignments.length === 0) {
        return <p>No data available</p>;
      }
    return (
        <table>
            <thead>
                <tr>
                    <th>EMPLOYEE_ID</th>
                    <th>EMPLOYEE_NAME</th>
                    <th>PROJECT_NAME</th>
                    <th>START_DATE</th>
                </tr>
            </thead>
            <tbody>
                {project_assignments.map((item, index) => (
                    <tr key={index}>
                        <td>{item.employee_id}</td>
                        <td>{item.employee_name}</td>
                        <td>{item.project_name}</td>
                        <td>{item.start_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

