import React from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";

export function DeleteSemester({
    semester,
    planID,
    removeSemester
}: {
    semester: Semester;
    planID: number;
    removeSemester: (planID: number, semester: Semester) => void;
}): JSX.Element {
    function deleteSemester(): void {
        removeSemester(planID, semester);
    }

    return (
        <Button onClick={deleteSemester} variant="empty" className="me-8">
            ✖️
        </Button>
    );
}
