import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function EditCourseModal({
    handleClose,
    course,
    editCourse,
    deletCourse
}: {
    handleClose: () => void;
    course: Course;
    editCourse: (id: number, newCourse: Course) => void;
    deletCourse: (id: number) => void;
}) {
    const [id, setId] = useState<string>(course.id.toString());
    const [name, setName] = useState<string>(course.name);
    const [description, setDescription] = useState<string>(course.description);
    const [credits, setCredits] = useState<string>(course.credits.toString());
    const [showAddModal, setShowAddModal] = useState(false);
    const [editing, setEditing] = useState<boolean>(false);

    const handleShowAddModal = () => setShowAddModal(true);

    function save() {
        editCourse(course.id, {
            ...course,
            id: parseInt(id),
            name: name,
            description: description,
            credits: parseInt(credits)
        });
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    function changeEditing() {
        setEditing(!editing);
        setShowAddModal(false);
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
                    onClick={() => deletCourse(course.id)}
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
                    </Modal.Body>
                    <Modal.Footer>
                        {/* Save/Cancel */}
                        <Button
                            onClick={save}
                            variant="success"
                            className="me-4"
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
                            onClick={() => deletCourse(course.id)}
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
