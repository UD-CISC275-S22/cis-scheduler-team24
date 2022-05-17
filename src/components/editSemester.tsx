import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Semester } from "../interfaces/semester";

export function EditSemester({
    semester,
    planID,
    setSemesterName,
    openEdit
}: {
    semester: Semester;
    planID: number;
    setSemesterName: (
        planID: number,
        semesterID: number,
        semesterName: string
    ) => void;
    openEdit: () => void;
}): JSX.Element {
    const [name, setName] = useState<string>(semester.name);

    function save(): void {
        setSemesterName(planID, semester.id, name);
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
                    data-testid="editSemester"
                    className="form-control-style-1"
                />
                <div
                    onClick={save}
                    data-testid="editSemester-save"
                    style={{
                        display: "flex",
                        marginLeft: "20px",
                        marginRight: "20px"
                    }}
                >
                    💾
                </div>
            </InputGroup>
        </div>
    );
}
