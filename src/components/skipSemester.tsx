import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function SkipSemester({
    isSkipped,
    semesterCourses,
    floatingCourses,
    takenCourses,
    planID,
    setSkipped,
    setFloatingCourses,
    setTakenCourses
}: {
    isSkipped: boolean;
    semesterCourses: Course[];
    floatingCourses: Course[];
    takenCourses: Course[];
    planID: number;
    setSkipped: (skip: boolean) => void;
    setFloatingCourses: (planID: number, floats: Course[]) => void;
    setTakenCourses: (planID: number, takenCourses: Course[]) => void;
}): JSX.Element {
    function changeSkip() {
        isSkipped ? unskipCourse() : skipCourse();
    }

    function skipCourse() {
        setSkipped(true);
        setFloatingCourses(planID, [...floatingCourses, ...semesterCourses]);
        setTakenCourses(
            planID,
            takenCourses.filter(
                (course: Course): boolean =>
                    !semesterCourses
                        .map((semCourse: Course): number => semCourse.id)
                        .includes(course.id)
            )
        );
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
