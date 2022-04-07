import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { ListCourses } from "./listCourses";
import courses from "../data/courses.json";

const COURSES = courses.map(
    (course): Course => ({
        ...course
    })
);

export function ViewSemester({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [courses] = useState<Course[]>(COURSES);
    const [semesterName /*, setSemesterName*/] = useState<string>(
        semester.session + ", " + semester.year
    );

    return (
        <div>
            <Container>
                <h3>{semesterName}</h3>
                <ListCourses semesterCourses={courses}></ListCourses>
            </Container>
        </div>
    );
}
