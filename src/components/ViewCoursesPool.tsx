import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function ViewCoursesPool({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [courses /*setcourses*/] = useState<Course[]>(semester.courses);
    return (
        <Container>
            {courses.map((course: Course) => (
                <div key={semester.id}>
                    <Table>
                        <thead>
                            <tr>
                                <th>{course.id}</th>
                                <th>{course.name}</th>
                                <th>{course.description}</th>
                                <th>{course.credits}</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            ))}
        </Container>
    );
}
