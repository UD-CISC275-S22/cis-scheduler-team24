import React, { useState } from "react";

import { Container, Table } from "react-bootstrap";

import { Semester } from "../interfaces/semester";

import { Course } from "../interfaces/course";

import { ListCourses } from "./listCourses";

export function ViewSemester({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [courses /*, setcourses*/] = useState<Course[]>(semester.courses);

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>
                                <ListCourses
                                    semesterCourses={courses}
                                ></ListCourses>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
