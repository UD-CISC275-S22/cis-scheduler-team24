import React, { useState } from "react";
import { Col, Row /*, Button, Offcanvas , Table*/ } from "react-bootstrap";
import "./App.css";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
import { ListPlans } from "./components/listPlans";
import { ViewFloatingCourses } from "./components/viewFloatingCourses";
import { ViewRequirements } from "./components/viewRequirements";
import plans from "./data/plans.json";
import courses from "./data/course–book.json";

const COURSES = courses.map(
    (course): Course => ({
        ...course,
        prerequisites: course.prerequisites.map(Number)
    })
);

const PLANS = plans.map(
    (plan): Plan => ({
        ...plan,
        semesters: plan.semesters.map(
            (semester: Semester): Semester => ({
                ...semester,
                name: semester.session + ", " + semester.year,
                courses: COURSES.filter((course: Course): boolean =>
                    semester.courses.includes(course.id)
                ).map((course: Course): number => course.id)
            })
        ),
        requirements: plan.requirements.map(Number),
        taken_courses: plan.taken_courses.map(Number)
    })
);

const FLOATING_COURSES = courses.filter(
    (course: Course): boolean => !course.isTaken
);

const REQUIRED_COURSES = courses.filter(
    (course: Course): boolean => course.isRequired
);

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(PLANS);
    const [courses /*, setCourses*/] = useState<Course[]>(COURSES);
    const [floatingCourses, setFloatingCourses] =
        useState<Course[]>(FLOATING_COURSES);
    const [requiredCourses, setRequiredCourses] =
        useState<Course[]>(REQUIRED_COURSES);
    //onst [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

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

    function setRequirements(newReqs: Course[]): void {
        setRequiredCourses(newReqs);
    }

    function setFloats(newFloats: Course[]): void {
        setFloatingCourses(newFloats);
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
                    <Col sm={10} style={{ overflow: "auto" }}>
                        <ListPlans
                            plans={plans}
                            courses={courses}
                            addPlan={addPlan}
                            deletePlan={deletePlan}
                            setPlanName={setPlanName}
                        ></ListPlans>
                    </Col>
                    <Col>
                        <Row /*style={{ columnWidth: "100px" }}*/>
                            <div>
                                <span>Floating Courses:</span>
                                <ViewFloatingCourses
                                    floatingCourses={floatingCourses}
                                    setFloats={setFloats}
                                ></ViewFloatingCourses>
                                <div>Required Courses:</div>
                                <ViewRequirements
                                    requirements={requiredCourses}
                                    setRequirements={setRequirements}
                                ></ViewRequirements>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default App;
