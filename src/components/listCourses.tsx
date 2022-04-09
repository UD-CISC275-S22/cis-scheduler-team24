import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
//import { ViewCourse } from "./viewCourse";

export function ListCourses({
    semesterCourses
}: {
    semesterCourses: Course[];
}): JSX.Element {
    const [courses] = useState<Course[]>(semesterCourses);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>CourseID</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                        <th>Course Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course: Course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.credits}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
