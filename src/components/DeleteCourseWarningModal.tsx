import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function DeleteCourseWarningModal({
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
                                removeCourse();
                                cancel();
                            }}
                            variant="danger"
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
