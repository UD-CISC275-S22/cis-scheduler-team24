import React from "react";
import { Nav, Tab, Button } from "react-bootstrap";
import { ViewPlan } from "./viewPlan";
import { Plan } from "../interfaces/plan";
import { DeletePlan } from "./deletePlan";

export function ListPlans({
    plans,
    addPlan,
    deletePlan,
    setPlanName
}: {
    plans: Plan[];
    addPlan: () => void;
    deletePlan: (id: number) => void;
    setPlanName: (id: number, name: string) => void;
}): JSX.Element {
    return (
        <div>
            <Tab.Container defaultActiveKey={plans[0].id}>
                <Nav variant="tabs">
                    {plans.map((plan: Plan) => (
                        <Nav.Item key={plan.id}>
                            <div style={{ display: "flex" }}>
                                <Nav.Link eventKey={plan.id}>
                                    {plan.name}
                                </Nav.Link>
                                <DeletePlan
                                    plan={plan}
                                    deletePlan={deletePlan}
                                ></DeletePlan>
                            </div>
                        </Nav.Item>
                    ))}
                    <Nav.Item>
                        <Button variant="outline-primary" onClick={addPlan}>
                            <div>Add Plan</div>
                        </Button>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    {plans.map((plan: Plan) => (
                        <Tab.Pane key={plan.id} eventKey={plan.id}>
                            <ViewPlan
                                plan={plan}
                                setPlanName={setPlanName}
                            ></ViewPlan>
                        </Tab.Pane>
                    ))}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
}
