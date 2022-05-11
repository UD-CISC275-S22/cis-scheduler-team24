import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function ViewRequirements({
    requirements,
    takenCourses
}: {
    requirements: Course[];
    takenCourses: Course[];
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
                    {requirements.map((requirement: Course) => (
                        <tr key={requirement.id}>
                            <td>
                                <td>{requirement.name}</td>
                            </td>
                            {takenCourses
                                .map(
                                    (takenCourse: Course): number =>
                                        takenCourse.id
                                )
                                .includes(requirement.id)
                                ? "✓"
                                : "✗"}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
