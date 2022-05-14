import React from "react";
import { Nav, Tab, Button } from "react-bootstrap";
import { ViewPlan } from "./viewPlan";
import { Plan } from "../interfaces/plan";
import { Course } from "../interfaces/course";
import { DeletePlan } from "./DeletePlan";

export function ListPlans({
    courses,
    plans,
    setCourses,
    addPlan,
    deletePlan,
    setPlanName
}: {
    courses: Course[];
    plans: Plan[];
    setCourses: (courses: Course[]) => void;
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
                                courses={courses}
                                plan={plan}
                                setCourses={setCourses}
                                setPlanName={setPlanName}
                            ></ViewPlan>
                        </Tab.Pane>
                    ))}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
}
