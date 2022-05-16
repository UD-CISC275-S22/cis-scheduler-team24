import React from "react";
import { Dropdown, DropdownButton, InputGroup, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
export function ViewFloatingCourses({
    floatingCourses,
    takenCourses,
    semesterCourses,
    setFloats,
    setTakenCourses,
    setSemesterCourses,
    semesters
}: {
    floatingCourses: Course[];
    takenCourses: Course[];
    semesterCourses: Course[];
    setFloats: (newFloats: Course[]) => void;
    setTakenCourses: (newCourses: Course[]) => void;
    setSemesterCourses: (newCourses: Course[]) => void;
    semesters: Semester[];
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
                                                    setFloats(
                                                        floatingCourses.filter(
                                                            (
                                                                floater: Course
                                                            ): boolean =>
                                                                course.id !==
                                                                floater.id
                                                        )
                                                    );
                                                    setTakenCourses([
                                                        ...takenCourses,
                                                        {
                                                            ...course,
                                                            prerequisites:
                                                                course.prerequisites
                                                        }
                                                    ]);
                                                    setSemesterCourses([
                                                        ...semesterCourses,
                                                        {
                                                            ...course,
                                                            prerequisites:
                                                                course.prerequisites
                                                        }
                                                    ]);
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
