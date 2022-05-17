import React from "react";
import { Nav, Tab, Button } from "react-bootstrap";
import { ViewPlan } from "./viewPlan";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { DeletePlan } from "./DeletePlan";

export function ListPlans({
    courses,
    plans,
    setCourses,
    addPlan,
    deletePlan,
    setPlanName,
    addSemester,
    removeSemester,
    removeSemesterCourses,
    clearSemesters,
    removeCourse,
    setSemesterName,
    skipSemester,
    setFloatingCourses,
    setRequiredCourses,
    setTakenCourses,
    setSemesterCourses,
    moveFromFloatingCourses
}: {
    courses: Course[];
    plans: Plan[];
    setCourses: (courses: Course[]) => void;
    addPlan: () => void;
    deletePlan: (planID: number) => void;
    setPlanName: (planID: number, name: string) => void;
    addSemester: (planID: number) => void;
    removeSemester: (planID: number, semester: Semester) => void;
    removeSemesterCourses: (planID: number, semester: Semester) => void;
    clearSemesters: (planID: number) => void;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    setSemesterName: (
        planID: number,
        semesterID: number,
        semesterName: string
    ) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    setFloatingCourses: (planID: number, floats: Course[]) => void;
    setRequiredCourses: (planID: number, requirements: Course[]) => void;
    setTakenCourses: (planID: number, takenCourses: Course[]) => void;
    setSemesterCourses: (
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ) => void;
    moveFromFloatingCourses: (
        planID: number,
        semester: Semester,
        course: Course,
        floatingCourses: Course[],
        takenCourses: Course[]
    ) => void;
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
                                addSemester={addSemester}
                                removeSemester={removeSemester}
                                removeSemesterCourses={removeSemesterCourses}
                                clearSemesters={clearSemesters}
                                removeCourse={removeCourse}
                                setSemesterName={setSemesterName}
                                skipSemester={skipSemester}
                                setFloatingCourses={setFloatingCourses}
                                setRequiredCourses={setRequiredCourses}
                                setTakenCourses={setTakenCourses}
                                setSemesterCourses={setSemesterCourses}
                                moveFromFloatingCourses={
                                    moveFromFloatingCourses
                                }
                            ></ViewPlan>
                        </Tab.Pane>
                    ))}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
}
