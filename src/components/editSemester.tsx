import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";

export function EditSemester({
    semester,
    setSemesterName,
    openEdit
}: {
    semester: Semester;
    setSemesterName: (id: number, name: string) => void;
    openEdit: () => void;
}): JSX.Element {
    const [name, setName] = useState<string>(semester.name);

    function save(): void {
        setSemesterName(semester.id, name);
        openEdit();
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>New Name:</Form.Label>
                <Col>
                    <Form.Control
                        value={name}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setName(event.target.value)}
                    />
                </Col>
            </Form.Group>
            <Button onClick={save}>Save Name</Button>
        </div>
    );
}
