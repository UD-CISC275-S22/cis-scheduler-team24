import React from "react";
import { Dropdown, DropdownButton, InputGroup, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function ViewFloatingCourses({
    floatingCourses,
    setFloats
}: {
    floatingCourses: Course[];
    setFloats: (newFloats: Course[]) => void;
}): JSX.Element {
    // const [newfloatingCourses, setnewfloatingCourses] =
    //     useState<Course[]>(floatingCourses);
    return (
        <div>
            <div>COURSE</div>
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
                                            onClick={() => setFloats}
                                        >
                                            Spring
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="#"
                                            onClick={() => setFloats}
                                        >
                                            Summer
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="#"
                                            onClick={() => setFloats}
                                        >
                                            Fall
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="#"
                                            onClick={() => setFloats}
                                        >
                                            Winter
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
