import React, { useState } from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ViewSemester } from "./viewSemester";
import { EditSemester } from "./editSemester";
import { DeleteSemester } from "./DeleteSemester";
export function ListSemesters({
    planSemesters,
    courses,
    floatingCourses,
    requiredCourses,
    takenCourses,
    addSemester,
    removeSemester,
    setSemesterName,
    setFloats,
    setRequirements,
    setTakenCourses,
    updateCourses
}: {
    planSemesters: Semester[];
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
    addSemester: () => void;
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
    setTakenCourses: (courses: Course[]) => void;
    updateCourses: (newCourse: Course) => void;
}): JSX.Element {
    const [isEditing, setEditing] = useState<boolean>(false);

    function openEdit(): void {
        setEditing(!isEditing);
    }

    return (
        <div>
            <Table striped bordered hover>
                {planSemesters.map((semester: Semester) => (
                    <Accordion key={semester.id} defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <span>
                                    <div style={{ display: "flex" }}>
                                        {isEditing ? (
                                            <EditSemester
                                                semester={semester}
                                                setSemesterName={
                                                    setSemesterName
                                                }
                                                openEdit={openEdit}
                                            ></EditSemester>
                                        ) : (
                                            <div>
                                                {semester.name}
                                                <Button
                                                    onClick={openEdit}
                                                    variant="empty"
                                                    className="me-8"
                                                    data-testid="Edit-semester-name"
                                                >
                                                    🖊
                                                </Button>
                                            </div>
                                        )}

                                        <DeleteSemester
                                            semester={semester}
                                            removeSemester={removeSemester}
                                            setFloats={setFloats}
                                            setRequirements={setRequirements}
                                            setTakenCourses={setTakenCourses}
                                            courses={courses}
                                            floatingCourses={floatingCourses}
                                            requiredCourses={requiredCourses}
                                            takenCourses={takenCourses}
                                        ></DeleteSemester>
                                    </div>
                                </span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div key={semester.id}>
                                    <ViewSemester
                                        semester={semester}
                                        courses={courses}
                                        floatingCourses={floatingCourses}
                                        requiredCourses={requiredCourses}
                                        takenCourses={takenCourses}
                                        setFloats={setFloats}
                                        setRequirements={setRequirements}
                                        setTakenCourses={setTakenCourses}
                                        updateCourses={updateCourses}
                                    ></ViewSemester>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </Table>
            <Button onClick={addSemester} className="button-style-5">
                Add Semester
            </Button>
        </div>
    );
}
