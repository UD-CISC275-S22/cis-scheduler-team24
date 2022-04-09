import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";

export function ViewSemester({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [courses] = useState<Course[]>(semester.courses);
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
