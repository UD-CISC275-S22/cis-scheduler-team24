import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
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
    planID,
    addSemester,
    removeSemester,
    removeSemesterCourses,
    removeCourse,
    addCourse,
    editCourse,
    setSemesterName,
    skipSemester,
    unskipSemester
}: {
    planSemesters: Semester[];
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
    planID: number;
    addSemester: (planID: number) => void;
    removeSemester: (planID: number, semester: Semester) => void;
    removeSemesterCourses: (planID: number, semester: Semester) => void;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    addCourse: (planID: number, semesterID: number, course: Course) => void;
    editCourse: (
        planID: number,
        semesterID: number,
        isRequired: boolean,
        course: Course
    ) => void;
    setSemesterName: (
        planID: number,
        semesterID: number,
        semesterName: string
    ) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    unskipSemester: (planID: number, semester: Semester) => void;
}): JSX.Element {
    const [isEditing, setEditing] = useState<boolean>(false);

    function openEdit(): void {
        setEditing(!isEditing);
    }

    function newSemester(): void {
        addSemester(planID);
    }

    return (
        <div>
            {planSemesters.map((semester: Semester) => (
                <Accordion key={semester.id} defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <span>
                                <div style={{ display: "flex" }}>
                                    {isEditing ? (
                                        <EditSemester
                                            semester={semester}
                                            planID={planID}
                                            setSemesterName={setSemesterName}
                                            openEdit={openEdit}
                                        ></EditSemester>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex"
                                            }}
                                        >
                                            {semester.name}
                                            <div
                                                onClick={openEdit}
                                                className="me-8"
                                                data-testid="Edit-semester-name"
                                                style={{
                                                    display: "flex",
                                                    marginLeft: "15px",
                                                    marginRight: "15px"
                                                }}
                                            >
                                                🖊
                                            </div>
                                        </div>
                                    )}

                                    <DeleteSemester
                                        semester={semester}
                                        planID={planID}
                                        removeSemester={removeSemester}
                                    ></DeleteSemester>
                                </div>
                            </span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <ViewSemester
                                    semester={semester}
                                    courses={courses}
                                    planID={planID}
                                    floatingCourses={floatingCourses}
                                    requiredCourses={requiredCourses}
                                    takenCourses={takenCourses}
                                    removeSemesterCourses={
                                        removeSemesterCourses
                                    }
                                    removeCourse={removeCourse}
                                    addCourse={addCourse}
                                    editCourse={editCourse}
                                    skipSemester={skipSemester}
                                    unskipSemester={unskipSemester}
                                ></ViewSemester>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
            <Button onClick={newSemester} className="button-style-5">
                Add Semester
            </Button>
        </div>
    );
}
