import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Semester } from "../interfaces/semester";

export function DeleteCourseModal({
    removeSemesterCourses,
    planID,
    semester
}: {
    removeSemesterCourses: (planID: number, semester: Semester) => void;
    planID: number;
    semester: Semester;
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
                    onClick={handleShowDeleteModal}
                    variant="danger"
                    data-testid="Delete-course-modal"
                >
                    Delete All Courses
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
                        <Modal.Title>⚠️</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Are you sure you want to delete all your classes
                            this semester?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                removeSemesterCourses(planID, semester);
                                cancel();
                            }}
                            variant="danger"
                            data-testid="Delete-All-Courses"
                        >
                            Delete All Courses
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
