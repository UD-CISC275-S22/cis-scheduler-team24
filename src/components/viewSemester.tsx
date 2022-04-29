import React from "react";
import { Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { ListCourses } from "./listCourses";

export function ViewSemester({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>
                                <ListCourses
                                    semesterCourses={semester.courses}
                                ></ListCourses>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
