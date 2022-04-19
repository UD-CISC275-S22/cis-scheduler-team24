import React, { useState } from "react";
import { Tabs, Tab, Col, Row, Table, Button, Offcanvas } from "react-bootstrap";
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
                name: semester.session + ", " + semester.year,
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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <header className="App-header">
                <div>
                    Team 24 College Planner by Weldin, Zhiwen, and Jingqing
                </div>
            </header>
            <div>
                <Row>
                    <Col sm={10}>
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
                                            setPlanName={setPlanName}
                                        ></ViewPlan>
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <div>
                                <Button variant="primary" onClick={handleShow}>
                                    Show Courses Pool and Degree plan
                                </Button>

                                <Offcanvas
                                    show={show}
                                    onHide={handleClose}
                                    placement={"end"}
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>
                                            Degree Plan
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Course Pool</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {plans.map(
                                                            (plan: Plan) => (
                                                                <div
                                                                    key={
                                                                        plan.id
                                                                    }
                                                                >
                                                                    <ListCoursesPool
                                                                        plan={
                                                                            plan
                                                                        }
                                                                    ></ListCoursesPool>
                                                                </div>
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Degree Plan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {degreeplan.map(
                                                            (plan: Plan) => (
                                                                <div
                                                                    key={
                                                                        plan.id
                                                                    }
                                                                >
                                                                    <Listdegreeplan
                                                                        plan={
                                                                            plan
                                                                        }
                                                                    ></Listdegreeplan>
                                                                </div>
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default App;
