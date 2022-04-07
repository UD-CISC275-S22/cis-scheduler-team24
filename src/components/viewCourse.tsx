import React from "react";
import { Container } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function ViewCourse({ course }: { course: Course }): JSX.Element {
    return (
        <div>
            <Container>
                <span>{course.name}</span>
            </Container>
        </div>
    );
}
