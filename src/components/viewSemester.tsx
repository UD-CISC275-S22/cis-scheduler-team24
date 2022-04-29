import React from "react";
import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";
import { EditSemester } from "./editSemester";

export function ViewSemester({
    semester,
    courses,
    removeSemester,
    setSemesterName
}: {
    semester: Semester;
    courses: Course[];
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
}): JSX.Element {
    const [semesterCourses /*, setSemesterCourses*/] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            semester.courses.includes(course.id)
        )
    );
    const [isEditing, setEditing] = useState<boolean>(false);

    function deleteSemester(): void {
        removeSemester(semester.id);
    }

    function openEdit(): void {
        setEditing(!isEditing);
    }

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>
                                <span>
                                    {isEditing ? (
                                        <EditSemester
                                            semester={semester}
                                            setSemesterName={setSemesterName}
                                            openEdit={openEdit}
                                        ></EditSemester>
                                    ) : (
                                        <div>
                                            {semester.name}
                                            <Button
                                                onClick={openEdit}
                                                variant="empty"
                                                className="me-8"
                                            >
                                                🖊
                                            </Button>
                                        </div>
                                    )}
                                </span>
                            </th>
                            <th>
                                <Button onClick={deleteSemester}>
                                    Remove Semester
                                </Button>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <ListCourses
                                    semesterCourses={semesterCourses}
                                ></ListCourses>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
