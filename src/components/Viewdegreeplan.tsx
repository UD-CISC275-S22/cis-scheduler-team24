import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function Viewdegreeplan({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [courses /*setcourses*/] = useState<Course[]>(semester.courses);
    return (
        <div>
            {courses.map((course: Course) => (
                <div key={semester.id}>
                    <Table>
                        <thead>
                            <tr>
                                <th>{course.name}</th>
                                <th>{course.description}</th>
                                <th>{course.credits}</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            ))}
        </div>
    );
}
