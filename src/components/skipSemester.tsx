import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function SkipSemester({
    isSkipped,
    semesterCourses,
    floatingCourses,
    takenCourses,
    setSkipped,
    setFloats,
    setTakenCourses
}: {
    isSkipped: boolean;
    semesterCourses: Course[];
    floatingCourses: Course[];
    takenCourses: Course[];
    setSkipped: (skip: boolean) => void;
    setFloats: (courses: Course[]) => void;
    setTakenCourses: (courses: Course[]) => void;
}): JSX.Element {
    function changeSkip() {
        isSkipped ? unskipCourse() : skipCourse();
    }

    function skipCourse() {
        setSkipped(true);
        setFloats([...floatingCourses, ...semesterCourses]);
        setTakenCourses(
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
        setFloats(
            floatingCourses.filter(
                (course: Course): boolean =>
                    !semesterCourses
                        .map((semCourse: Course): number => semCourse.id)
                        .includes(course.id)
            )
        );
        setTakenCourses([...takenCourses, ...semesterCourses]);
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
