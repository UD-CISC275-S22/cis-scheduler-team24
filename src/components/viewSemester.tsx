import React from "react";
import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";
import { EditSemester } from "./editSemester";

export function ViewSemester({
    semester,
    removeSemester,
    setSemesterName
}: {
    semester: Semester;
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
}): JSX.Element {
    const [courses /*, setcourses*/] = useState<Course[]>(semester.courses);
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
                                    semesterCourses={courses}
                                ></ListCourses>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
