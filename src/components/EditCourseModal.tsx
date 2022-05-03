import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DeleteCourseWarningModalX } from "./DeleteCourseWarningModalX";
import { DeleteCourseWarningModal } from "./DeleteCourseWarningModal";
export function EditCourseModal({
    handleClose,
    course,
    requiredCourses,
    editCourse,
    deleteCourse,
    setRequirements
}: {
    handleClose: () => void;
    course: Course;
    requiredCourses: Course[];
    editCourse: (id: number, newCourse: Course) => void;
    deleteCourse: (course: Course) => void;
    setRequirements: (courses: Course[]) => void;
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

    const [resetid] = useState<string>(course.id.toString());
    const [resetname] = useState<string>(course.name);
    const [resetdescription] = useState<string>(course.description);
    const [resetcredits] = useState<string>(course.credits.toString());
    const [resetprereqs] = useState<string>(
        course.prerequisites.map(String).join(", ")
    );
    const [resetisRequired] = useState<boolean>(course.isRequired);

    function reset() {
        editCourse(course.id, {
            ...course,
            id: parseInt(resetid),
            name: resetname,
            description: resetdescription,
            credits: parseInt(resetcredits),
            prerequisites: resetprereqs.split(", ").map(Number),
            isRequired: resetisRequired
        });
        changeEditing();
        makeRequired();
        setId(resetid.toString());
        setName(resetname);
        setDescription(resetdescription);
        setCredits(resetcredits.toString());
        setPrereqs(resetprereqs);
        setRequired(resetisRequired);
        changeEditing();
    }
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
        makeRequired();
    }

    function makeRequired() {
        if (isRequired) {
            setRequirements([
                ...requiredCourses,
                {
                    ...course,
                    id: parseInt(id),
                    name: name,
                    description: description,
                    credits: parseInt(credits),
                    prerequisites: prereqs.split(", ").map(Number),
                    isRequired: isRequired
                }
            ]);
        } else {
            setRequirements(
                requiredCourses.filter(
                    (reqCourse: Course): boolean => reqCourse.id !== course.id
                )
            );
        }
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

    function removeCourse() {
        deleteCourse(course);
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div>
                    <Button
                        variant="success"
                        className="button-style-1"
                        onClick={handleShowAddModal}
                        id="edit"
                    >
                        Edit
                    </Button>
                </div>
                <div>
                    <DeleteCourseWarningModalX
                        removeCourse={removeCourse}
                    ></DeleteCourseWarningModalX>
                </div>
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
                        <div>
                            <DeleteCourseWarningModal
                                removeCourse={removeCourse}
                            ></DeleteCourseWarningModal>
                        </div>
                        <Button
                            onClick={reset}
                            variant="primary"
                            className="me-4"
                            disabled={!id}
                        >
                            Reset
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
