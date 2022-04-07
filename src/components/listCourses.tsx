import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { ViewCourse } from "./viewCourse";

export function ListCourses({
    semesterCourses
}: {
    semesterCourses: Course[];
}): JSX.Element {
    const [courses] = useState<Course[]>(semesterCourses);

    return (
        <div>
            <Stack gap={3}>
                {courses.map((course: Course) => (
                    <div key={course.id}>
                        <ViewCourse course={course}></ViewCourse>
                    </div>
                ))}
            </Stack>
        </div>
    );
}
