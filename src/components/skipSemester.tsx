import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function SkipSemester({
    isSkipped,
    semesterCourses,
    floatingCourses,
    takenCourses,
    planID,
    semester,
    setSkipped,
    skipSemester,
    setFloatingCourses,
    setTakenCourses
}: {
    isSkipped: boolean;
    semesterCourses: Course[];
    floatingCourses: Course[];
    takenCourses: Course[];
    planID: number;
    semester: Semester;
    setSkipped: (skip: boolean) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    setFloatingCourses: (planID: number, floats: Course[]) => void;
    setTakenCourses: (planID: number, takenCourses: Course[]) => void;
}): JSX.Element {
    function changeSkip() {
        isSkipped ? unskipCourse() : skipSemester(planID, semester);
        setSkipped(true);
    }

    function unskipCourse() {
        setSkipped(false);
        setFloatingCourses(
            planID,
            floatingCourses.filter(
                (course: Course): boolean =>
                    !semesterCourses
                        .map((semCourse: Course): number => semCourse.id)
                        .includes(course.id)
            )
        );
        setTakenCourses(planID, [...takenCourses, ...semesterCourses]);
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
