import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function EditCourseModal({
    handleClose,
    course,
    editCourse,
    deleteCourse
}: {
    handleClose: () => void;
    course: Course;
    editCourse: (id: number, newCourse: Course) => void;
    deleteCourse: (id: number) => void;
}) {
    const [id, setId] = useState<string>(course.id.toString());
    const [name, setName] = useState<string>(course.name);
    const [description, setDescription] = useState<string>(course.description);
    const [credits, setCredits] = useState<string>(course.credits.toString());
    const [showAddModal, setShowAddModal] = useState(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [prereqs, setPrereqs] = useState<string>(
        course.prerequisites.map(String).join(", ")
    );
    const [isRequired, setRequired] = useState<boolean>(course.isRequired);

    const handleShowAddModal = () => setShowAddModal(true);

    function save() {
        editCourse(course.id, {
            ...course,
            id: parseInt(id),
            name: name,
            description: description,
            credits: parseInt(credits),
            prerequisites: prereqs.split(", ").map(Number),
            isRequired: isRequired
        });
        changeEditing();
    }

    function cancel() {
        setId(course.id.toString());
        setName(course.name);
        setDescription(course.description);
        setCredits(course.credits.toString());
        setPrereqs(course.prerequisites.map(String).join(", "));
        setRequired(course.isRequired);
        changeEditing();
    }

    function changeEditing() {
        setEditing(!editing);
        setShowAddModal(false);
    }

    function changeRequirement() {
        setRequired(!isRequired);
        console.log(isRequired);
    }

    return (
        <div>
            <div>
                <Button
                    variant="success"
                    className="button-style-1"
                    onClick={handleShowAddModal}
                    id="edit"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => deleteCourse(course.id)}
                    variant="empty"
                    className="me-8"
                >
                    ✖️
                </Button>
            </div>
            <div>
                <Modal
                    show={showAddModal}
                    onHide={handleClose}
                    animation={true}
                >
                    <Modal.Header>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* ID */}
                        <Form.Group controlId="formCourseID" as={Row}>
                            <Form.Label column sm={2}>
                                Course ID:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    value={id}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => setId(event.target.value)}
                                    placeholder="Must have a course ID"
                                />
                            </Col>
                        </Form.Group>
                        {/* Name */}
                        <Form.Group controlId="formCourseName" as={Row}>
                            <Form.Label column sm={2}>
                                Course name:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    value={name}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => setName(event.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        {/* Description */}
                        <Form.Group controlId="formCourseDescription" as={Row}>
                            <Form.Label column sm={2}>
                                Course description:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    value={description}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => setDescription(event.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        {/* Credits */}
                        <Form.Group controlId="formCourseCredits" as={Row}>
                            <Form.Label column sm={2}>
                                Course credits:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    value={credits}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => setCredits(event.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        {/* Prerequisities */}
                        <Form.Group controlId="formPrerequisites" as={Row}>
                            <Form.Label column sm={2}>
                                Course Prerequisites (ID):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    value={prereqs}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => setPrereqs(event.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* Required */}
                        <Form.Check
                            type="checkbox"
                            id="required-check"
                            label="Required?"
                            onChange={changeRequirement}
                            checked={isRequired}
                        />
                        {/* Save/Cancel */}
                        <Button
                            onClick={save}
                            variant="success"
                            className="me-4"
                            disabled={!id}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={cancel}
                            variant="warning"
                            className="me-5"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => deleteCourse(course.id)}
                            variant="danger"
                            className="me-8"
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
