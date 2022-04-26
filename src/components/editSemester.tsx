import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
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
            <InputGroup className="mb-3">
                <Form.Control
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                    }
                    className="form-control-style-1"
                />
                <Button variant="secondary" onClick={save}>
                    Save
                </Button>
            </InputGroup>
        </div>
    );
}
