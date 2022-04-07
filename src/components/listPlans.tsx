import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { ViewPlan } from "./viewPlan";

export function ListPlans({
    degreePlans
}: {
    degreePlans: Plan[];
}): JSX.Element {
    const [plans] = useState<Plan[]>(degreePlans);

    return (
        <div>
            <Stack gap={3}>
                {plans.map((plan: Plan) => (
                    <div key={plan.name}>
                        <ViewPlan plan={plan}></ViewPlan>
                    </div>
                ))}
            </Stack>
        </div>
    );
}
