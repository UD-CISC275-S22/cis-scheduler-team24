import React, { useState } from "react";
import { Stack } from "react-bootstrap";
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
            <Stack gap={3}>
                {semesters.map((semester: Semester) => (
                    <div key={semester.id}>
                        <ViewSemester semester={semester}></ViewSemester>
                    </div>
                ))}
            </Stack>
        </div>
    );
}
