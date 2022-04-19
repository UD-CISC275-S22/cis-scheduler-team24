import React, { useState } from "react";
import { Tabs, Tab, Col, Row, Table } from "react-bootstrap";
import "./App.css";
import { ViewPlan } from "./components/viewPlan";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
import plans from "./data/plans.json";
import degreeplan from "./data/degreeplan.json";
import { ListCoursesPool } from "./components/listCoursesPool";
import { Listdegreeplan } from "./components/listdegreeplan";

const PLANS = plans.map(
    (plan): Plan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester: Semester): Semester => ({
                ...semester,
                courses: semester.courses.map(
                    (course: Course): Course => ({ ...course })
                )
            })
        )
    })
);

const DegreePlan = degreeplan.map((plan: Plan) => ({
    ...plan,
    semesters: plan.semesters.map(
        (semester: Semester): Semester => ({
            ...semester,
            courses: semester.courses.map(
                (course: Course): Course => ({ ...course })
            )
        })
    )
}));

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(PLANS);
    const [degreeplan /*setdegreeplan*/] = useState<Plan[]>(DegreePlan);

    function addPlan(): void {
        setPlans([
            ...plans,
            {
                id: plans.length + 1,
                name: "Blank Plan",
                semesters: [],
                requirements: [],
                taken_courses: [],
                floating_courses: []
            }
        ]);
    }

    function deletePlan(id: number): void {
        setPlans(plans.filter((plan: Plan): boolean => plan.id !== id));
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Team 24 College Planner by Weldin, Zhiwen, and Jingqing
                </div>
            </header>
            <div>
                <Row>
                    <Col sm={8}>
                        <div>
                            <Tabs defaultActiveKey={plans[0].id}>
                                {plans.map((plan: Plan) => (
                                    <Tab
                                        key={plan.id}
                                        eventKey={plan.id}
                                        title={plan.name}
                                    >
                                        <ViewPlan
                                            plan={plan}
                                            deletePlan={deletePlan}
                                            addPlan={addPlan}
                                        ></ViewPlan>
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Course Pool</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {plans.map((plan: Plan) => (
                                            <div key={plan.id}>
                                                <ListCoursesPool
                                                    plan={plan}
                                                ></ListCoursesPool>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Row>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Degree Plan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {degreeplan.map((plan: Plan) => (
                                                <div key={plan.id}>
                                                    <Listdegreeplan
                                                        plan={plan}
                                                    ></Listdegreeplan>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default App;
