import React, { useState } from "react";
import {
    Button,
    Container,
    Table,
    Form,
    Card,
    Col,
    Row
} from "react-bootstrap";
import { Course } from "../interfaces/course";
import { EditCourseModal } from "./EditCourseModal";

export function ListCourses({
    courses,
    semesterCourses,
    requiredCourses,
    planID,
    semesterID,
    removeCourse,
    setRequiredCourses,
    setSemesterCourses,
    updateCourses,
    updateSemesterCourses
}: {
    courses: Course[];
    semesterCourses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
    planID: number;
    semesterID: number;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    setRequiredCourses: (planID: number, requirements: Course[]) => void;
    setSemesterCourses: (
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ) => void;
    updateCourses: (newCourse: Course) => void;
    updateSemesterCourses: (newCourse: Course) => void;
}): JSX.Element {
    const [showAddModal, setShowAddModal] = useState(false);
    showAddModal;
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<string>("");
    const [prereqs, setPrereqs] = useState<string>("");

    const handleCloseAddModal = () => setShowAddModal(false);

    const Credits = semesterCourses.reduce(
        (currentTotal: number, course: Course) => currentTotal + course.credits,
        0
    );

    // function SaveData() {
    //     localStorage.setItem(saveDataKey, JSON.stringify(tableCourses));
    // }

    function editCourse(id: number, newCourse: Course) {
        setSemesterCourses(
            planID,
            semesterID,
            semesterCourses.map(
                (course: Course): Course =>
                    course.id === id ? newCourse : course
            )
        );
    }

    function addCourse(newCourse: Course) {
        const existing = courses.find(
            (course: Course): boolean => course.id === newCourse.id
        );
        if (existing === undefined) {
            setSemesterCourses(planID, semesterID, [
                ...semesterCourses,
                newCourse
            ]);
            updateSemesterCourses(newCourse);
            updateCourses(newCourse);
        }
    }

    function saveAddChange() {
        addCourse({
            id: courses.length + 1,
            name: name,
            credits: parseInt(credits),
            description: description,
            prerequisites: prereqs.split(", ").map(Number),
            isEditing: false,
            breadthType: ""
        });
        setName("");
        setDescription("");
        setCredits("");
        setPrereqs("");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Description</th>
                                <th>Course Credit</th>
                                <th>Course Prerequisites</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {semesterCourses.map((course: Course) => (
                                <tr key={course.id}>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.credits}</td>
                                    <td>
                                        {courses
                                            .filter(
                                                (
                                                    degreeCourse: Course
                                                ): boolean =>
                                                    course.prerequisites.includes(
                                                        degreeCourse.id
                                                    )
                                            )
                                            .map((degreeCourse: Course) => (
                                                <Card
                                                    key={degreeCourse.id}
                                                    border="info"
                                                    bg=""
                                                    className="mb-1"
                                                >
                                                    {degreeCourse.name}
                                                </Card>
                                            ))}
                                    </td>
                                    <td>
                                        <EditCourseModal
                                            handleClose={handleCloseAddModal}
                                            course={course}
                                            planID={planID}
                                            semesterID={semesterID}
                                            requiredCourses={requiredCourses}
                                            editCourse={editCourse}
                                            removeCourse={removeCourse}
                                            setRequiredCourses={
                                                setRequiredCourses
                                            }
                                        ></EditCourseModal>
                                    </td>
                                </tr>
                            ))}
                            <tr key="CourseInput">
                                <td>
                                    <Form.Control
                                        value={name}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => setName(event.target.value)}
                                        placeholder="Enter Name"
                                        data-testid="Enter-Name"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        value={description}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => setDescription(event.target.value)}
                                        placeholder="Enter Description"
                                        data-testid="Enter-Description"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        value={credits}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => setCredits(event.target.value)}
                                        placeholder="Enter Credits"
                                        data-testid="Enter-Credits"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        value={prereqs}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => setPrereqs(event.target.value)}
                                        placeholder="Enter Prerequisites"
                                        data-testid="Enter-Prerequisites"
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={saveAddChange}
                                        className="button-style-2"
                                        disabled={!name || !credits}
                                    >
                                        Add Course
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Container>
                        <div>Total Credits: {Credits}</div>
                        {/* <Button onClick={SaveData}>Save</Button> */}
                    </Container>
                </Col>
            </Row>
        </div>
    );
}
