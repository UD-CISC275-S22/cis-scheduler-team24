import React from "react";
import { DropdownButton, InputGroup, Table } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
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
                        <th>
                            <div>Course</div>
                        </th>
                        <th>
                            <div>Move</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {floatingCourses.map((floatingCourse: Course) => (
                        <tr key={floatingCourse.id}>
                            <td>{floatingCourse.name}</td>
                            <td>
                                <InputGroup className="mb-3">
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title="Move"
                                        id="input-group-dropdown-2"
                                    >
                                        {semesters.map((semester: Semester) => (
                                            <DropdownItem
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
                                            </DropdownItem>
                                        ))}
                                    </DropdownButton>
                                </InputGroup>
                            </td>
                        </tr>
                    ))}
                    {/*floatingCourses.map((course: Course) => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
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
                                                    removeFloatingCourse(
                                                        course
                                                    );
                                                    takeCourse(course);
                                                    addSemesterCourse(
                                                        course,
                                                        semester
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
                                            ))*/}
                </tbody>
            </Table>
        </div>
    );
}
