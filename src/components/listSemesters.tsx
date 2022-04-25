import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { ViewSemester } from "./viewSemester";

export function ListSemesters({
    planSemesters,
    removeSemester,
    setSemesterName
}: {
    planSemesters: Semester[];
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
}): JSX.Element {
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
                                        {semester.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div key={semester.id}>
                                            <ViewSemester
                                                semester={semester}
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
