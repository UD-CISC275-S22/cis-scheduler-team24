import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ListSemesters } from "./listSemesters";
import { EditPlan } from "./editPlan";

export function ViewPlan({
    plan,
    setPlanName
}: {
    plan: Plan;
    setPlanName: (id: number, name: string) => void;
}): JSX.Element {
    const [semesters, setSemesters] = useState<Semester[]>(plan.semesters);
    const [isEditing, setEditing] = useState<boolean>(false);

    function openEdit(): void {
        setEditing(!isEditing);
    }

    function addSemester(): void {
        setSemesters([
            ...semesters,
            {
                id: semesters.length + 1,
                name: "New Semester",
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

    function clearSemesters(): void {
        setSemesters([]);
    }

    function setSemesterName(id: number, name: string): void {
        setSemesters(
            semesters.map(
                (semester: Semester): Semester =>
                    semester.id === id ? { ...semester, name: name } : semester
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
                                <div>
                                    {isEditing ? (
                                        <EditPlan
                                            plan={plan}
                                            setPlanName={setPlanName}
                                            openEdit={openEdit}
                                        ></EditPlan>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            onClick={openEdit}
                                        >
                                            Edit Name
                                        </Button>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ListSemesters
                                    planSemesters={semesters}
                                    removeSemester={removeSemester}
                                    setSemesterName={setSemesterName}
                                ></ListSemesters>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="success" onClick={addSemester}>
                                    Add Semester
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <Button variant="success" onClick={clearSemesters}>
                        Clear Semesters
                    </Button>
                </div>
            </Container>
        </div>
    );
}
