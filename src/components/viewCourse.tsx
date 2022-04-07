import React from "react";
import { Container } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export function ViewCourse({ course }: { course: Course }): JSX.Element {
    return (
        <div>
            <Container>
                <span>{course.name}</span>
            </Container>
        </div>
    );
}
