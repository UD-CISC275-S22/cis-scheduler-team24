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
import { DeleteCourseModal } from "./DeleteCourseModal";
import { EditCourseModal } from "./EditCourseModal";

export function ListCourses({
    allCourses,
    semesterCourses,
    floatingCourses,
    requiredCourses,
    takenCourses,
    setFloats,
    setRequirements,
    setTakenCourses,
    setSemesterCourses,
    removeSemesterCourses,
    updateCourses,
    updateSemesterCourses
}: {
    allCourses: Course[];
    semesterCourses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    takenCourses: Course[];
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
    setTakenCourses: (courses: Course[]) => void;
    setSemesterCourses: (courses: Course[]) => void;
    removeSemesterCourses: () => void;
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
            semesterCourses.map(
                (course: Course): Course =>
                    course.id === id ? newCourse : course
            )
        );
    }

    function deleteCourse(doomedCourse: Course) {
        setSemesterCourses(
            semesterCourses.filter(
                (course: Course): boolean => course.id !== doomedCourse.id
            )
        );
        setFloats([...floatingCourses, { ...doomedCourse }]);
        setTakenCourses(
            takenCourses.filter(
                (course: Course): boolean => course.id !== doomedCourse.id
            )
        );
        setShowAddModal(false);
    }

    function addCourse(newCourse: Course) {
        const existing = allCourses.find(
            (course: Course): boolean => course.id === newCourse.id
        );
        if (existing === undefined) {
            setSemesterCourses([...semesterCourses, newCourse]);
            updateSemesterCourses(newCourse);
            updateCourses(newCourse);
        }
    }

    function saveAddChange() {
        addCourse({
            id: allCourses.length + 1,
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
        console.log(allCourses[allCourses.length].id + 1);
    }

    function deleteAllCourse() {
        setSemesterCourses([]);
        removeSemesterCourses();
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
                                        {allCourses
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
                                            requiredCourses={requiredCourses}
                                            editCourse={editCourse}
                                            deleteCourse={deleteCourse}
                                            setRequirements={setRequirements}
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
                    <Container>
                        <DeleteCourseModal
                            deletCourse={() => {
                                deleteAllCourse();
                            }}
                        ></DeleteCourseModal>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}
