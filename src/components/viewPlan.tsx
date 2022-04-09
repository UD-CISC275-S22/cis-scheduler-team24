import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
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
    const [semesters] = useState<Semester[]>(plan.semesters);

    function removePlan(): void {
        deletePlan(plan.id);
    }

    return (
        <div>
            <Container>
                <h3>{plan.name}</h3>
                <ListSemesters planSemesters={semesters}></ListSemesters>
                <Button onClick={removePlan}>Delete Plan</Button>
            </Container>
        </div>
    );
}
