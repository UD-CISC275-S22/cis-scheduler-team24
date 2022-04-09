import React from "react";
import { useState } from "react";
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
    const [semesterName /*, setSemesterName*/] = useState<string>(
        semester.session + ", " + semester.year
    );

    // function Removeds(name: string) {
    //     setcourses(courses.filter((f: Course): boolean => f.name !== name));
    // }

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>{semesterName}</th>
                        </tr>
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
