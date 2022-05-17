import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { DeleteCourseWarningModalX } from "./DeleteCourseWarningModalX";
import { DeleteCourseWarningModal } from "./DeleteCourseWarningModal";
import { Course } from "../interfaces/course";

export function EditCourseModal({
    handleClose,
    course,
    planID,
    semesterID,
    requiredCourses,
    editCourse,
    removeCourse
}: {
    handleClose: () => void;
    course: Course;
    planID: number;
    semesterID: number;
    requiredCourses: Course[];
    editCourse: (
        planID: number,
        semesterID: number,
        isRequired: boolean,
        course: Course
    ) => void;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
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
        editCourse(
            planID,
            semesterID,
            requiredCourses
                .map((course: Course): number => course.id)
                .includes(course.id),
            {
                ...course,
                name: resetname,
                description: resetdescription,
                credits: parseInt(resetcredits),
                prerequisites: resetprereqs.split(", ").map(Number)
            }
        );
        changeEditing();
        setName(resetname);
        setDescription(resetdescription);
        setCredits(resetcredits.toString());
        setPrereqs(resetprereqs);
        setRequired(requiredCourses.map(Number).includes(course.id));
        changeEditing();
    }

    function save() {
        editCourse(planID, semesterID, isRequired, {
            ...course,
            name: name,
            description: description,
            credits: parseInt(credits),
            prerequisites: prereqs.split(", ").map(Number)
        });
        changeEditing();
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

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div onClick={handleShowAddModal}>
                    <Button
                        variant="success"
                        className="button-style-1"
                        id="edit"
                    >
                        <div>Edit</div>
                    </Button>
                </div>
                <div>
                    <DeleteCourseWarningModalX
                        removeCourse={removeCourse}
                        planID={planID}
                        semesterID={semesterID}
                        course={course}
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
                                planID={planID}
                                semesterID={semesterID}
                                course={course}
                            ></DeleteCourseWarningModal>
                        </div>
                        <div onClick={reset}>
                            <Button
                                variant="primary"
                                className="me-4"
                                disabled={!name}
                            >
                                <div>Reset</div>
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
