import React from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/plan";

export function DeletePlan({
    plan,
    deletePlan
}: {
    plan: Plan;
    deletePlan: (id: number) => void;
}): JSX.Element {
    function removePlan(): void {
        deletePlan(plan.id);
    }

    return (
        <Button variant="empty" onClick={removePlan}>
            ✖️
        </Button>
    );
}
