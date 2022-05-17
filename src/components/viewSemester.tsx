import React from "react";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";
import { SkipSemester } from "./skipSemester";
import { DeleteCourseModal } from "./DeleteCourseModal";

export function ViewSemester({
    semester,
    courses,
    planID,
    floatingCourses,
    requiredCourses,
    takenCourses,
    removeSemesterCourses,
    removeCourse,
    addCourse,
    skipSemester,
    unskipSemester,
    setRequiredCourses,
    setSemesterCourses
}: {
    semester: Semester;
    courses: Course[];
    planID: number;
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
    removeSemesterCourses: (planID: number, semester: Semester) => void;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    addCourse: (planID: number, semesterID: number, course: Course) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    unskipSemester: (planID: number, semester: Semester) => void;
    setRequiredCourses: (planID: number, requirements: Course[]) => void;
    setSemesterCourses: (
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ) => void;
}): JSX.Element {
    const [isSkipped, setSkipped] = useState<boolean>(semester.isSkipped);

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>
                                <SkipSemester
                                    isSkipped={isSkipped}
                                    planID={planID}
                                    semester={semester}
                                    setSkipped={setSkipped}
                                    skipSemester={skipSemester}
                                    unskipSemester={unskipSemester}
                                ></SkipSemester>
                                {isSkipped ? (
                                    <div></div>
                                ) : (
                                    <div>
                                        <ListCourses
                                            courses={courses}
                                            semesterCourses={courses.filter(
                                                (course: Course): boolean =>
                                                    semester.courses.includes(
                                                        course.id
                                                    )
                                            )}
                                            floatingCourses={floatingCourses}
                                            requiredCourses={requiredCourses}
                                            takenCourses={takenCourses}
                                            planID={planID}
                                            semesterID={semester.id}
                                            removeCourse={removeCourse}
                                            addCourse={addCourse}
                                            setRequiredCourses={
                                                setRequiredCourses
                                            }
                                            setSemesterCourses={
                                                setSemesterCourses
                                            }
                                        ></ListCourses>
                                        <DeleteCourseModal
                                            removeSemesterCourses={
                                                removeSemesterCourses
                                            }
                                            planID={planID}
                                            semester={semester}
                                        ></DeleteCourseModal>
                                    </div>
                                )}
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
