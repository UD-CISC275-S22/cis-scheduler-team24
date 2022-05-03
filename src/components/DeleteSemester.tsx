import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function DeleteSemester({
    semester,
    removeSemester,
    setFloats,
    courses,
    floatingCourses
}: {
    semester: Semester;
    removeSemester: (id: number) => void;
    setFloats: (courses: Course[]) => void;
    courses: Course[];
    floatingCourses: Course[];
}): JSX.Element {
    const [semesterCourses, setSemesterCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            semester.courses.includes(course.id)
        )
    );

    function deleteSemester(): void {
        removeSemester(semester.id);
        removeCourses();
    }

    function removeCourses(): void {
        setFloats([...floatingCourses, ...semesterCourses]);
        setSemesterCourses([]);
    }

    return (
        <Button onClick={deleteSemester} variant="empty" className="me-8">
            ✖️
        </Button>
    );
}
