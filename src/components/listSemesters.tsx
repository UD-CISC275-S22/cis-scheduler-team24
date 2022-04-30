import React from "react";
import { Accordion, Table, Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ViewSemester } from "./viewSemester";

export function ListSemesters({
    planSemesters,
    courses,
    floatingCourses,
    requiredCourses,
    addSemester,
    removeSemester,
    setSemesterName,
    setFloats,
    setRequirements
}: {
    planSemesters: Semester[];
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    addSemester: () => void;
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
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
                                                requiredCourses={
                                                    requiredCourses
                                                }
                                                removeSemester={removeSemester}
                                                setSemesterName={
                                                    setSemesterName
                                                }
                                                setFloats={setFloats}
                                                setRequirements={
                                                    setRequirements
                                                }
                                            ></ViewSemester>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </th>
                </tr>
            </Table>
            <Button variant="success" onClick={addSemester}>
                Add Semester
            </Button>
        </div>
    );
}
