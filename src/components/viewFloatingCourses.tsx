import React from "react";
import { Dropdown, DropdownButton, InputGroup, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
export function ViewFloatingCourses({
    floatingCourses,
    setFloats,
    addedCourse,
    semester
}: {
    floatingCourses: Course[];
    setFloats: (newFloats: Course[]) => void;
    addedCourse: (newCourse: Course) => void;
    semester: Semester;
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
                    {floatingCourses.map((course: Course) => (
                        <tr key={course.id}>
                            <td>
                                <td>{course.name}</td>
                            </td>
                            <td>
                                <InputGroup className="mb-3">
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title="Move"
                                        id="input-group-dropdown-2"
                                    >
                                        <Dropdown.Item
                                            href="#"
                                            onClick={() => {
                                                if (
                                                    semester.session ===
                                                    "Spring"
                                                ) {
                                                    setFloats(
                                                        floatingCourses.filter(
                                                            (
                                                                isexit: Course
                                                            ): boolean =>
                                                                isexit.id !==
                                                                course.id
                                                        )
                                                    );
                                                    addedCourse(course);
                                                }
                                            }}
                                        >
                                            Spring
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="#"
                                            onClick={() => {
                                                if (
                                                    semester.session === "Fall"
                                                ) {
                                                    setFloats(
                                                        floatingCourses.filter(
                                                            (
                                                                isexit: Course
                                                            ): boolean =>
                                                                isexit.id !==
                                                                course.id
                                                        )
                                                    );
                                                    addedCourse(course);
                                                }
                                            }}
                                        >
                                            Fall
                                        </Dropdown.Item>
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
