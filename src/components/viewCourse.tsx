import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function ViewCourse({ course }: { course: Course }): JSX.Element {
    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <tbody>
                        <tr>
                            <td>
                                <Row>
                                    <Col>{course.id}</Col>
                                    <Col>{course.name}</Col>
                                    <Col>{course.description}</Col>
                                    <Col>{course.credits}</Col>
                                </Row>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
