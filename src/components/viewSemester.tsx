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
    setFloats,
    setRequirements,
    updateCourses
}: {
    semester: Semester;
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
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
                    (course: Course): Course => ({ ...course, isTaken: false })
                )
            )
        );
        setRequirements(
            requiredCourses.map(
                (course: Course): Course =>
                    semesterCourses
                        .map((semCourse: Course): number => semCourse.id)
                        .includes(course.id)
                        ? { ...course, isTaken: false }
                        : { ...course }
            )
        );
        setSemesterCourses([]);
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
                                    semesterCourses={semesterCourses}
                                    floatingCourses={floatingCourses}
                                    requiredCourses={requiredCourses}
                                    setFloats={setFloats}
                                    setRequirements={setRequirements}
                                    removeSemesterCourses={
                                        removeSemesterCourses
                                    }
                                    updateCourses={updateCourses}
                                    updateSemesterCourses={
                                        updateSemesterCourses
                                    }
                                ></ListCourses>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
