import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function DeleteCourseWarningModalX({
    removeCourse
}: {
    removeCourse: () => void;
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
                    variant="empty"
                    className="me-8"
                    data-testid="Delete-course-X"
                >
                    ✖️
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
                                removeCourse();
                                cancel();
                            }}
                            variant="danger"
                            data-testid="modal-Delete-button-x"
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
