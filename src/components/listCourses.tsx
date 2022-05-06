import React, { useState } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { EditCourseModal } from "./EditCourseModal";

export function ListCourses({
    semesterCourses,
    floatingCourses,
    requiredCourses,
    setFloats,
    setRequirements,
    removeSemesterCourses,
    updateCourses,
    updateSemesterCourses,
    Noskip
}: {
    semesterCourses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
    removeSemesterCourses: () => void;
    updateCourses: (newCourse: Course) => void;
    updateSemesterCourses: (newCourse: Course) => void;
    Noskip: () => void;
}): JSX.Element {
    const [tableCourses, setTableCourses] = useState<Course[]>(semesterCourses);
    const [showAddModal, setShowAddModal] = useState(false);
    showAddModal;
    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<string>("");
    const [prereqs, setPrereqs] = useState<string>("");

    const handleCloseAddModal = () => setShowAddModal(false);

    const Credits = tableCourses.reduce(
        (currentTotal: number, course: Course) => currentTotal + course.credits,
        0
    );

    function editCourse(id: number, newCourse: Course) {
        setTableCourses(
            tableCourses.map(
                (course: Course): Course =>
                    course.id === id ? newCourse : course
            )
        );
    }

    function deleteCourse(doomedCourse: Course) {
        setTableCourses(
            tableCourses.filter(
                (course: Course): boolean => course.id !== doomedCourse.id
            )
        );
        setFloats([...floatingCourses, { ...doomedCourse, isTaken: false }]);
        setRequirements(
            requiredCourses.map(
                (course: Course): Course =>
                    course.id === doomedCourse.id
                        ? { ...course, isTaken: false }
                        : { ...course }
            )
        );
        setShowAddModal(false);
    }

    function addCourse(newCourse: Course) {
        const existing = tableCourses.find(
            (course: Course): boolean => course.id === newCourse.id
        );
        if (existing === undefined) {
            setTableCourses([...tableCourses, newCourse]);
            updateSemesterCourses(newCourse);
            updateCourses(newCourse);
        }
    }

    function saveAddChange() {
        addCourse({
            id: parseInt(id),
            name: name,
            credits: parseInt(credits),
            description: description,
            prerequisites: prereqs.split(", ").map(Number),
            isTaken: true,
            isEditing: false,
            isRequired: false,
            breadthType: ""
        });
        setId("");
        setName("");
        setDescription("");
        setCredits("");
        setPrereqs("");
    }

    function deleteAllCourse() {
        setTableCourses([]);
        removeSemesterCourses();
    }

    function undeleteAllCourse() {
        setTableCourses(semesterCourses);
        Noskip();
    }
    return (
        <div>
            <div style={{ marginLeft: "auto" }}>
                <span>
                    <Button onClick={deleteAllCourse}>skip!</Button>
                    <span>
                        <Button onClick={undeleteAllCourse}>Undo!</Button>
                    </span>
                </span>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                        <th>Course Credit</th>
                        <th>Course Prerequisites (ID)</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableCourses.map((course: Course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.credits}</td>
                            <td>{course.prerequisites.map(String)}</td>
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
                                value={id}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setId(event.target.value)}
                                placeholder="Enter Course ID*"
                                data-testid="Enter-Course-ID"
                            />
                        </td>
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
                                disabled={!id || !credits}
                            >
                                Add Course
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Container>
                <div>Total Credits: {Credits}</div>
            </Container>
            <Container>
                <DeleteCourseModal
                    deletCourse={() => {
                        deleteAllCourse();
                    }}
                ></DeleteCourseModal>
            </Container>
        </div>
    );
}
