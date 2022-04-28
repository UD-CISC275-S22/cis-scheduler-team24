import React, { useState } from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { EditSemester } from "./editSemester";
import { Course } from "../interfaces/course";
import { ViewSemester } from "./viewSemester";

export function ListSemesters({
    planSemesters,
    courses,
    removeSemester,
    setSemesterName
}: {
    planSemesters: Semester[];
    courses: Course[];
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
}): JSX.Element {
    const [isEditing, setEditing] = useState<boolean>(false);

    function openEdit(): void {
        setEditing(!isEditing);
    }

    return (
        <div>
            <Table striped bordered hover>
                <tr>
                    <th>
                        {planSemesters.map((semester: Semester) => (
                            <Accordion
                                key={semester.id}
                                defaultActiveKey="0"
                                flush
                            >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                {isEditing ? (
                                                    <EditSemester
                                                        semester={semester}
                                                        setSemesterName={
                                                            setSemesterName
                                                        }
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
                                            </div>
                                            <div placeholder="right">
                                                <Button
                                                    variant="empty"
                                                    onClick={() =>
                                                        removeSemester(
                                                            semester.id
                                                        )
                                                    }
                                                >
                                                    ✖️
                                                </Button>
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div key={semester.id}>
                                            <ViewSemester
                                                semester={semester}
                                                courses={courses}
                                                removeSemester={removeSemester}
                                                setSemesterName={
                                                    setSemesterName
                                                }
                                            ></ViewSemester>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </th>
                </tr>
            </Table>
        </div>
    );
}
