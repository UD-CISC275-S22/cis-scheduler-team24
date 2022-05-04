import React, { useState } from "react";
import { Col, Row /*, Button, Offcanvas , Table*/ } from "react-bootstrap";
import "./App.css";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { ListPlans } from "./components/listPlans";
import { Carouse } from "./components/Carouse";
import plans from "./data/plans.json";

const PLANS = plans.map(
    (plan): Plan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester: Semester): Semester => ({
                ...semester,
                name: semester.session + ", " + semester.year,
                courses: semester.courses.map(Number)
            })
        ),
        requirements: plan.requirements.map(Number),
        taken_courses: plan.taken_courses.map(Number)
    })
);

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(PLANS);

    function addPlan(): void {
        setPlans([
            ...plans,
            {
                id: plans.length + 1,
                name: "Blank Plan",
                semesters: [],
                requirements: [],
                taken_courses: [],
                floating_courses: [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
                ]
            }
        ]);
    }

    function deletePlan(id: number): void {
        setPlans(plans.filter((plan: Plan): boolean => plan.id !== id));
    }

    function setPlanName(id: number, name: string): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === id ? { ...plan, name: name } : plan
            )
        );
    }

    return (
        <div className="App">
            CISC275
            <Carouse></Carouse>
            <div>
                <Row>
                    <Col>
                        <ListPlans
                            plans={plans}
                            addPlan={addPlan}
                            deletePlan={deletePlan}
                            setPlanName={setPlanName}
                        ></ListPlans>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default App;
