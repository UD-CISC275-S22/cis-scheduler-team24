import React from "react";
import { Dropdown, DropdownButton, InputGroup, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
export function ViewFloatingCourses({
    floatingCourses,
    takenCourses,
    setFloatingCourses,
    setTakenCourses,
    setSemesterCourses,
    semesters,
    courses,
    planID
}: {
    floatingCourses: Course[];
    takenCourses: Course[];
    setFloatingCourses: (planID: number, floats: Course[]) => void;
    setTakenCourses: (planID: number, takenCourses: Course[]) => void;
    setSemesterCourses: (
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ) => void;
    semesters: Semester[];
    courses: Course[];
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
                                                    setFloatingCourses(
                                                        planID,
                                                        floatingCourses.filter(
                                                            (
                                                                floater: Course
                                                            ): boolean =>
                                                                course.id !==
                                                                floater.id
                                                        )
                                                    );
                                                    setTakenCourses(planID, [
                                                        ...takenCourses,
                                                        {
                                                            ...course,
                                                            prerequisites:
                                                                course.prerequisites
                                                        }
                                                    ]);
                                                    setSemesterCourses(
                                                        planID,
                                                        semester.id,
                                                        [
                                                            ...courses.filter(
                                                                (
                                                                    course: Course
                                                                ): boolean =>
                                                                    semester.courses.includes(
                                                                        course.id
                                                                    )
                                                            ),
                                                            {
                                                                ...course,
                                                                prerequisites:
                                                                    course.prerequisites
                                                            }
                                                        ]
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
