import React from "react";
import { Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { ViewSemester } from "./viewSemester";

export function ListSemesters({
    planSemesters,
    removeSemester
}: {
    planSemesters: Semester[];
    removeSemester: (id: number) => void;
}): JSX.Element {
    return (
        <div>
            <Table striped bordered hover>
                <tr>
                    <th>
                        {planSemesters.map((semester: Semester) => (
                            <div key={semester.id}>
                                <ViewSemester
                                    semester={semester}
                                    removeSemester={removeSemester}
                                ></ViewSemester>
                            </div>
                        ))}
                    </th>
                </tr>
            </Table>
        </div>
    );
}
