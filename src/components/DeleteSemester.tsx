import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function DeleteSemester({
    semester,
    removeSemester,
    setFloats,
    setRequirements,
    setTakenCourses,
    courses,
    floatingCourses,
    requiredCourses,
    takenCourses
}: {
    semester: Semester;
    removeSemester: (id: number) => void;
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
    setTakenCourses: (courses: Course[]) => void;
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
}): JSX.Element {
    const [semesterCourses, setSemesterCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            semester.courses.includes(course.id)
        )
    );

    function deleteSemester(): void {
        removeSemester(semester.id);
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

    return (
        <Button onClick={deleteSemester} variant="empty" className="me-8">
            ✖️
        </Button>
    );
}
