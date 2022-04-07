import React /*, { useState }*/ from "react";
import { Container } from "react-bootstrap";
import { Plan } from "../interfaces/Plan";

export function ViewPlan({ plan }: { plan: Plan }): JSX.Element {
    return (
        <div>
            <Container>
                <h3>{plan.name}</h3>
            </Container>
        </div>
    );
}
