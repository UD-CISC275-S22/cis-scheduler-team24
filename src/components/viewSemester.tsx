import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { ListCourses } from "./listCourses";
import courses from "../data/courses.json";

const COURSES = courses.map(
    (course): Course => ({
        ...course,
        prerequisites: []
    })
);

export function ViewSemester({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [courses] = useState<Course[]>(COURSES);

    return (
        <div>
            <Container>
                <h3>
                    {semester.session}
                    {", "}
                    {semester.year}
                </h3>
                <ListCourses semesterCourses={courses}></ListCourses>
            </Container>
        </div>
    );
}
