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
    const [showMore, setShowMore] = useState<boolean>(true);
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
                                {semester.name}
                                <div>
                                    {isEditing ? (
                                        <EditSemester
                                            semester={semester}
                                            setSemesterName={setSemesterName}
                                            openEdit={openEdit}
                                        ></EditSemester>
                                    ) : (
                                        <Button onClick={openEdit}>
                                            Edit Name
                                        </Button>
                                    )}
                                </div>
                            </th>
                            <th>
                                <Button
                                    className="btn"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? "Hide" : "show more"}
                                </Button>
                                <Button onClick={deleteSemester}>
                                    Remove Semester
                                </Button>
                            </th>
                        </tr>
                        <tr>
                            {showMore ? (
                                <th>
                                    <ListCourses
                                        semesterCourses={courses}
                                    ></ListCourses>
                                </th>
                            ) : (
                                <th> </th>
                            )}
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
