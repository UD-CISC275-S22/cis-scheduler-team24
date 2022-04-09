import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { ViewSemester } from "./viewSemester";

export function ListSemesters({
    planSemesters
}: {
    planSemesters: Semester[];
}): JSX.Element {
    const [semesters] = useState<Semester[]>(planSemesters);

    return (
        <div>
            <Table striped bordered hover>
                <tr>
                    <th>
                        {semesters.map((semester: Semester) => (
                            <div key={semester.id}>
                                <ViewSemester
                                    semester={semester}
                                ></ViewSemester>
                            </div>
                        ))}
                    </th>
                </tr>
            </Table>
        </div>
    );
}
