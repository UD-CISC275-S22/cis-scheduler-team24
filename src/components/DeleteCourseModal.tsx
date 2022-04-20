import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function DeleteCourseModal({
    handleClose,
    deletCourse
}: {
    handleClose: () => void;
    deletCourse: () => void;
}) {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleShowAddModal = () => setShowAddModal(true);

    function cancel() {
        setShowAddModal(false);
    }
    return (
        <div>
            <div>
                <Button onClick={handleShowAddModal} variant="danger">
                    Delete All Course
                </Button>
            </div>
            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showAddModal}
                    onHide={handleClose}
                    animation={true}
                    backdrop={true}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            ⚠️
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Are you sure you want to delete all your classes
                            this semester?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={deletCourse} variant="danger">
                            Delete All Course
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
