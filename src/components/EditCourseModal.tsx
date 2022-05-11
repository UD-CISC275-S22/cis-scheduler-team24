import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { DeleteCourseWarningModalX } from "./DeleteCourseWarningModalX";
import { DeleteCourseWarningModal } from "./DeleteCourseWarningModal";
import { Course } from "../interfaces/course";

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
    const [name, setName] = useState<string>(course.name);
    const [description, setDescription] = useState<string>(course.description);
    const [credits, setCredits] = useState<string>(course.credits.toString());
    const [showAddModal, setShowAddModal] = useState(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [prereqs, setPrereqs] = useState<string>(
        course.prerequisites.map(String).join(", ")
    );
    const [isRequired, setRequired] = useState<boolean>(
        requiredCourses
            .map((course: Course): number => course.id)
            .includes(course.id)
    );
    const handleShowAddModal = () => setShowAddModal(true);

    const [resetname] = useState<string>(course.name);
    const [resetdescription] = useState<string>(course.description);
    const [resetcredits] = useState<string>(course.credits.toString());
    const [resetprereqs] = useState<string>(
        course.prerequisites.map(String).join(", ")
    );

    function reset() {
        editCourse(course.id, {
            ...course,
            name: resetname,
            description: resetdescription,
            credits: parseInt(resetcredits),
            prerequisites: resetprereqs.split(", ").map(Number)
        });
        changeEditing();
        makeRequired();
        setName(resetname);
        setDescription(resetdescription);
        setCredits(resetcredits.toString());
        setPrereqs(resetprereqs);
        setRequired(requiredCourses.map(Number).includes(course.id));
        changeEditing();
    }

    function save() {
        editCourse(course.id, {
            ...course,
            name: name,
            description: description,
            credits: parseInt(credits),
            prerequisites: prereqs.split(", ").map(Number)
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
                    name: name,
                    description: description,
                    credits: parseInt(credits),
                    prerequisites: prereqs.split(", ").map(Number)
                }
            ]);
        } else {
            setRequirements(
                requiredCourses.filter(
                    (requirement: Course): boolean =>
                        course.id !== requirement.id
                )
            );
        }
    }

    function cancel() {
        setName(course.name);
        setDescription(course.description);
        setCredits(course.credits.toString());
        setPrereqs(course.prerequisites.map(String).join(", "));
        changeEditing();
    }

    function changeEditing() {
        setEditing(!editing);
        setShowAddModal(false);
    }

    function changeRequirement() {
        setRequired(!isRequired);
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
                                    data-testid="Edit Course name"
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
                                    data-testid="Edit Course description"
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
                                    data-testid="Edit Course credits"
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
                                    data-testid="Edit Course Prerequisities"
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
                            data-testid="Required?"
                        />
                        {/* Save/Cancel */}
                        <Button
                            onClick={save}
                            variant="success"
                            className="me-4"
                            disabled={!name}
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
                            disabled={!name}
                        >
                            Reset
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
