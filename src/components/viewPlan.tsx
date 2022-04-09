import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ListSemesters } from "./listSemesters";

export function ViewPlan({ plan }: { plan: Plan }): JSX.Element {
    const [semesters] = useState<Semester[]>(plan.semesters);

    return (
        <div>
            <Container>
                <h3>{plan.name}</h3>
                <ListSemesters planSemesters={semesters}></ListSemesters>
            </Container>
        </div>
    );
}
