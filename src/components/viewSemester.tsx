import React from "react";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";

export function ViewSemester({
    semester,
    courses,
    floatingCourses,
    requiredCourses,
    takenCourses,
    setFloats,
    setRequirements,
    setTakenCourses,
    updateCourses
}: {
    semester: Semester;
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
    setTakenCourses: (courses: Course[]) => void;
    updateCourses: (newCourse: Course) => void;
}): JSX.Element {
    const [semesterCourses, setSemesterCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            semester.courses.includes(course.id)
        )
    );

    function removeSemesterCourses(): void {
        setFloats(
            floatingCourses.concat(
                semesterCourses.map(
                    (course: Course): Course => ({
                        ...course,
                        prerequisites: course.prerequisites.map(Number)
                    })
                )
            )
        );
        setRequirements(
            requiredCourses.map(
                (course: Course): Course => ({
                    ...course,
                    prerequisites: course.prerequisites.map(Number)
                })
            )
        );
        setSemesterCourses([]);
        setTakenCourses(
            takenCourses.filter(
                (course: Course): boolean =>
                    !semesterCourses
                        .map((semCourse: Course): number => semCourse.id)
                        .includes(course.id)
            )
        );
    }

    function Noskip(): void {
        setFloats(
            floatingCourses.filter(
                (course: Course): boolean =>
                    !semester.courses.includes(course.id)
            )
        );
        setRequirements([...requiredCourses]);
        setSemesterCourses(
            courses.filter((course: Course): boolean =>
                semester.courses.includes(course.id)
            )
        );
    }

    function updateSemesterCourses(newCourse: Course): void {
        setSemesterCourses([...semesterCourses, newCourse]);
    }

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>
                                <ListCourses
                                    allCourses={courses}
                                    semesterCourses={semesterCourses}
                                    floatingCourses={floatingCourses}
                                    requiredCourses={requiredCourses}
                                    takenCourses={takenCourses}
                                    setFloats={setFloats}
                                    setRequirements={setRequirements}
                                    setTakenCourses={setTakenCourses}
                                    setSemesterCourses={setSemesterCourses}
                                    removeSemesterCourses={
                                        removeSemesterCourses
                                    }
                                    updateCourses={updateCourses}
                                    updateSemesterCourses={
                                        updateSemesterCourses
                                    }
                                    Noskip={Noskip}
                                ></ListCourses>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
