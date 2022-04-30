import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ViewSemester } from "./viewSemester";

export function ListSemesters({
    planSemesters,
    courses,
    floatingCourses,
    removeSemester,
    setSemesterName,
    setFloats
}: {
    planSemesters: Semester[];
    courses: Course[];
    floatingCourses: Course[];
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
    setFloats: (courses: Course[]) => void;
}): JSX.Element {
    return (
        <div>
            <Table striped bordered hover>
                <tr>
                    <th>
                        {planSemesters.map((semester: Semester) => (
                            <Accordion
                                key={semester.id}
                                defaultActiveKey="0"
                                flush
                            >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        {semester.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div key={semester.id}>
                                            <ViewSemester
                                                semester={semester}
                                                courses={courses}
                                                floatingCourses={
                                                    floatingCourses
                                                }
                                                removeSemester={removeSemester}
                                                setSemesterName={
                                                    setSemesterName
                                                }
                                                setFloats={setFloats}
                                            ></ViewSemester>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </th>
                </tr>
            </Table>
        </div>
    );
}
