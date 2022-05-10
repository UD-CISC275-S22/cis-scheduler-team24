import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function ViewRequirements({
    requirements
}: {
    requirements: Course[];
}): JSX.Element {
    return (
        <div>
            <Table striped bordered hover className="required">
                <thead>
                    <tr>
                        <th>
                            <div>Course</div>
                        </th>
                        <th>
                            <div>Taken?</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {requirements.map((course: Course) => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.isTaken ? "✓" : "✗"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
