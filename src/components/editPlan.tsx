import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
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
            <InputGroup className="mb-3">
                <Form.Control
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                    }
                    className="form-control-style-2"
                    data-testid="editplan"
                />
                <Button
                    variant="secondary"
                    onClick={save}
                    data-testid="editplan-save"
                >
                    Save
                </Button>
            </InputGroup>
        </div>
    );
}
