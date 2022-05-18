import React from "react";
import { DropdownButton, InputGroup, Table, Dropdown } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
export function ViewFloatingCourses({
    floatingCourses,
    takenCourses,
    moveFromFloatingCourses,
    semesters,
    planID
}: {
    floatingCourses: Course[];
    takenCourses: Course[];
    moveFromFloatingCourses: (
        planID: number,
        semester: Semester,
        course: Course,
        floatingCourses: Course[],
        takenCourses: Course[]
    ) => void;
    semesters: Semester[];
    planID: number;
}): JSX.Element {
    return (
        <div>
            <Table striped bordered hover className="required">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Move</th>
                    </tr>
                </thead>
                <tbody>
                    {floatingCourses.map((floatingCourse: Course) => (
                        <tr key={floatingCourse.id}>
                            <td>
                                {floatingCourse.code}
                                {": "}
                                {floatingCourse.name}
                            </td>
                            <td>
                                <InputGroup className="mb-3">
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title="Move"
                                        id="input-group-dropdown-2"
                                    >
                                        {semesters.map((semester: Semester) => (
                                            <Dropdown.Item
                                                key={semester.id}
                                                onClick={() => {
                                                    moveFromFloatingCourses(
                                                        planID,
                                                        semester,
                                                        floatingCourse,
                                                        floatingCourses,
                                                        takenCourses
                                                    );
                                                }}
                                            >
                                                {semester.name}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </InputGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
