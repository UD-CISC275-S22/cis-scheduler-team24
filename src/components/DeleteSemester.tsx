import React from "react";
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
        <div
            onClick={deleteSemester}
            className="me-8"
            style={{
                display: "flex",
                marginLeft: "20px",
                marginRight: "20px"
            }}
            data-testid="Delete-Semester"
        >
            ✖️
        </div>
    );
}
