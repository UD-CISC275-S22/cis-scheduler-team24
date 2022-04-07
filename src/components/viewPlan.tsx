import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ListSemesters } from "./listSemesters";
import semesters from "../data/semesters.json";

const SEMESTERS = semesters.map(
    (semester): Semester => ({
        ...semester
    })
);

export function ViewPlan({ plan }: { plan: Plan }): JSX.Element {
    const [semesters] = useState<Semester[]>(SEMESTERS);

    return (
        <div>
            <Container>
                <h3>{plan.name}</h3>
                <ListSemesters planSemesters={semesters}></ListSemesters>
            </Container>
        </div>
    );
}
