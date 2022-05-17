import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function DeleteCourseWarningModal({
    removeCourse,
    planID,
    semesterID,
    course
}: {
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    planID: number;
    semesterID: number;
    course: Course;
}) {
    const [showAddModal, setShowDeleteModal] = useState(false);

    const handleShowDeleteModal = () => setShowDeleteModal(true);

    function cancel() {
        setShowDeleteModal(false);
    }

    return (
        <div>
            <div>
                <Button
                    onClick={() => {
                        handleShowDeleteModal();
                    }}
                    variant="danger"
                    className="me-8"
                >
                    Delete
                </Button>
            </div>
            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showAddModal}
                    animation={true}
                    backdrop={true}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            ⚠️
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this course?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                removeCourse(planID, semesterID, course);
                                cancel();
                            }}
                            variant="danger"
                            data-testid="modal-Delete-button"
                        >
                            Delete
                        </Button>
                        <Button onClick={cancel} variant="warning">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
