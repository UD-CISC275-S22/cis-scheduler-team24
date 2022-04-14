import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Plan } from "../interfaces/plan";

export function EditPlan({
    plan,
    setPlanName,
    openEdit
}: {
    plan: Plan;
    setPlanName: (id: number, name: string) => void;
    openEdit: () => void;
}): JSX.Element {
    const [name, setName] = useState<string>(plan.name);

    function save(): void {
        setPlanName(plan.id, name);
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
