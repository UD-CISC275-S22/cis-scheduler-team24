import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function ClearSemesterModal({
    clearSemesters
}: {
    clearSemesters: () => void;
}) {
    const [showAddModal, setShowDeleteModal] = useState(false);

    const handleShowDeleteModal = () => setShowDeleteModal(true);

    function cancel() {
        setShowDeleteModal(false);
    }

    function clearSemestersbutton() {
        setShowDeleteModal(false);
        clearSemesters();
    }

    return (
        <div>
            <div>
                <Button
                    variant="danger"
                    onClick={handleShowDeleteModal}
                    style={{ flex: "auto", margin: "15px" }}
                >
                    Clear Semesters
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
                        <p>
                            Are you sure you want to clear all your semesters
                            this plan?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={clearSemestersbutton} variant="danger">
                            Yes
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
