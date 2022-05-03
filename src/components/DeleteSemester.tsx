import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function DeleteSemester({
    semester,
    removeSemester,
    setFloats,
    setRequirements,
    courses,
    floatingCourses,
    requiredCourses
}: {
    semester: Semester;
    removeSemester: (id: number) => void;
    setFloats: (courses: Course[]) => void;
    setRequirements: (course: Course[]) => void;
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
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

    return (
        <Button onClick={deleteSemester} variant="empty" className="me-8">
            ✖️
        </Button>
    );
}
