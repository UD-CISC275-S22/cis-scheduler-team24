import React from "react";
import { Form } from "react-bootstrap";
import { Semester } from "../interfaces/semester";

export function SkipSemester({
    isSkipped,
    planID,
    semester,
    setSkipped,
    skipSemester,
    unskipSemester
}: {
    isSkipped: boolean;
    planID: number;
    semester: Semester;
    setSkipped: (skip: boolean) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    unskipSemester: (planID: number, semester: Semester) => void;
}): JSX.Element {
    function changeSkip() {
        isSkipped ? unskip() : skip();
    }

    function skip() {
        skipSemester(planID, semester);
        setSkipped(true);
    }

    function unskip() {
        unskipSemester(planID, semester);
        setSkipped(false);
    }

    return (
        <div className="skip-button">
            <Form.Check
                type="checkbox"
                id="check-skip"
                label="Skip"
                checked={isSkipped}
                onChange={changeSkip}
            ></Form.Check>
        </div>
    );
}
