import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function DeleteSemester({
    semester,
    planID,
    removeSemester,
    setFloatingCourses,
    setTakenCourses,
    setSemesterCourses,
    courses,
    floatingCourses,
    takenCourses
}: {
    semester: Semester;
    planID: number;
    removeSemester: (planID: number, semesterID: number) => void;
    setFloatingCourses: (planID: number, floats: Course[]) => void;
    setTakenCourses: (planID: number, takenCourses: Course[]) => void;
    setSemesterCourses: (
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ) => void;
    courses: Course[];
    floatingCourses: Course[];
    takenCourses: Course[];
}): JSX.Element {
    function deleteSemester(): void {
        removeSemester(planID, semester.id);
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

    return (
        <Button onClick={deleteSemester} variant="empty" className="me-8">
            ✖️
        </Button>
    );
}
