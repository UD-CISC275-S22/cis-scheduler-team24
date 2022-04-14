import React, { useState } from "react";
import { Container, Button, Table, Col, Form } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ListSemesters } from "./listSemesters";

export function ViewPlan({
    plan,
    deletePlan,
    addPlan,
    setPlanName
}: {
    plan: Plan;
    deletePlan: (id: number) => void;
    addPlan: () => void;
    setPlanName: (id: number, name: string) => void;
}): JSX.Element {
    const [semesters, setSemesters] = useState<Semester[]>(plan.semesters);
    const [isEditing, setEditing] = useState<boolean>(false);
    const [planName /*, setPlanName*/] = useState<string>(plan.name);

    function openEdit(): void {
        setEditing(!isEditing);
    }

    function changePlanName(event: React.ChangeEvent<HTMLInputElement>) {
        setPlanName(plan.id, event.target.value);
    }

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

    function clearSemesters(): void {
        setSemesters([]);
    }

    return (
        <div>
            <Container>
                <Table striped borderless>
                    <thead>
                        <tr>
                            <th>
                                <h3>{planName}</h3>
                                <span>
                                    <Button onClick={openEdit}>
                                        {isEditing ? "Save Name" : "Edit Name"}
                                    </Button>
                                </span>
                                {isEditing && (
                                    <Form.Group controlId="formplanname">
                                        <Form.Label>New Name:</Form.Label>
                                        <Col>
                                            <Form.Control
                                                value={planName}
                                                onChange={changePlanName}
                                            />
                                        </Col>
                                    </Form.Group>
                                )}
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
                <div>
                    <Button onClick={clearSemesters}>Clear Semesters</Button>
                </div>
                <div>
                    <Button onClick={addPlan}>Add Plan</Button>
                </div>
                <div>
                    <Button onClick={removePlan}>Delete Plan</Button>
                </div>
            </Container>
        </div>
    );
}
