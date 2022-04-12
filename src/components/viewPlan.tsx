import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ListSemesters } from "./listSemesters";

export function ViewPlan({
    plan,
    deletePlan
}: {
    plan: Plan;
    deletePlan: (id: number) => void;
}): JSX.Element {
    const [semesters, setSemesters] = useState<Semester[]>(plan.semesters);

    function removePlan(): void {
        deletePlan(plan.id);
    }

    function addSemester(): void {
        setSemesters([
            ...semesters,
            {
                id: semesters.length + 1,
                name: "",
                year: 0,
                session: "Smarch",
                courses: [],
                totalCredits: 0,
                isSkipped: false
            }
        ]);
    }

    function removeSemester(id: number): void {
        setSemesters(
            semesters.filter(
                (semester: Semester): boolean => semester.id !== id
            )
        );
    }

    return (
        <div>
            <Container>
                <Table striped borderless>
                    <thead>
                        <tr>
                            <th>
                                <h3>{plan.name}</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ListSemesters
                                    planSemesters={semesters}
                                    removeSemester={removeSemester}
                                ></ListSemesters>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button onClick={addSemester}>
                                    Add Semester
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={removePlan}>Delete Plan</Button>
            </Container>
        </div>
    );
}
