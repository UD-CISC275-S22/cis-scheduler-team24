import React from "react";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";
import { SkipSemester } from "./skipSemester";

export function ViewSemester({
    semester,
    courses,
    planID,
    floatingCourses,
    requiredCourses,
    takenCourses,
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

    function removeSemesterCourses(): void {
        setFloatingCourses(
            planID,
            floatingCourses.concat(
                courses
                    .filter((course: Course): boolean =>
                        semester.courses.includes(course.id)
                    )
                    .map(
                        (course: Course): Course => ({
                            ...course,
                            prerequisites: course.prerequisites.map(Number)
                        })
                    )
            )
        );
        setRequiredCourses(
            planID,
            requiredCourses.map(
                (course: Course): Course => ({
                    ...course,
                    prerequisites: course.prerequisites.map(Number)
                })
            )
        );
        setSemesterCourses(planID, semester.id, []);
        setTakenCourses(
            planID,
            takenCourses.filter(
                (course: Course): boolean =>
                    !courses
                        .filter((course: Course): boolean =>
                            semester.courses.includes(course.id)
                        )
                        .map((semCourse: Course): number => semCourse.id)
                        .includes(course.id)
            )
        );
    }

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
                                    setSkipped={setSkipped}
                                    setFloatingCourses={setFloatingCourses}
                                    setTakenCourses={setTakenCourses}
                                ></SkipSemester>
                                {isSkipped ? (
                                    <div></div>
                                ) : (
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
                                        setFloatingCourses={setFloatingCourses}
                                        setRequiredCourses={setRequiredCourses}
                                        setTakenCourses={setTakenCourses}
                                        setSemesterCourses={setSemesterCourses}
                                        removeSemesterCourses={
                                            removeSemesterCourses
                                        }
                                        updateCourses={updateCourses}
                                        updateSemesterCourses={
                                            updateSemesterCourses
                                        }
                                    ></ListCourses>
                                )}
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
