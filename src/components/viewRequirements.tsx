import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function ViewRequirements({
    requiredCourses,
    takenCourses
}: {
    requiredCourses: Course[];
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
                    {requiredCourses.map((requiredCourse: Course) => (
                        <tr key={requiredCourse.id}>
                            <td>
                                <td>
                                    {requiredCourse.code}
                                    {": "}
                                    {requiredCourse.name}
                                </td>
                            </td>
                            {takenCourses
                                .map(
                                    (takenCourse: Course): number =>
                                        takenCourse.id
                                )
                                .includes(requiredCourse.id)
                                ? "✓"
                                : "✗"}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
