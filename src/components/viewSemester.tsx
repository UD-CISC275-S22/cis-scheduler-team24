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
    skipSemester,
    setFloatingCourses,
    setRequiredCourses,
    setTakenCourses,
    setSemesterCourses,
    updateCourses
}: {
    semester: Semester;
    courses: Course[];
    planID: number;
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
    removeSemesterCourses: (planID: number, semester: Semester) => void;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    setFloatingCourses: (planID: number, floats: Course[]) => void;
    setRequiredCourses: (planID: number, requirements: Course[]) => void;
    setTakenCourses: (planID: number, takenCourses: Course[]) => void;
    setSemesterCourses: (
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ) => void;
    updateCourses: (newCourse: Course) => void;
}): JSX.Element {
    const [isSkipped, setSkipped] = useState<boolean>(semester.isSkipped);

    function updateSemesterCourses(newCourse: Course): void {
        setSemesterCourses(planID, semester.id, [
            ...courses.filter((course: Course): boolean =>
                semester.courses.includes(course.id)
            ),
            newCourse
        ]);
    }

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>
                                <SkipSemester
                                    isSkipped={isSkipped}
                                    semesterCourses={courses.filter(
                                        (course: Course): boolean =>
                                            semester.courses.includes(course.id)
                                    )}
                                    floatingCourses={floatingCourses}
                                    takenCourses={takenCourses}
                                    planID={planID}
                                    semester={semester}
                                    setSkipped={setSkipped}
                                    skipSemester={skipSemester}
                                    setFloatingCourses={setFloatingCourses}
                                    setTakenCourses={setTakenCourses}
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
                                            setRequiredCourses={
                                                setRequiredCourses
                                            }
                                            setSemesterCourses={
                                                setSemesterCourses
                                            }
                                            updateCourses={updateCourses}
                                            updateSemesterCourses={
                                                updateSemesterCourses
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
