import React from "react";
import { Nav, Tab, Button, Form } from "react-bootstrap";
import { ViewPlan } from "./viewPlan";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { DeletePlan } from "./DeletePlan";

export function ListPlans({
    courses,
    plans,
    addPlan,
    deletePlan,
    setPlanName,
    addSemester,
    removeSemester,
    removeSemesterCourses,
    clearSemesters,
    removeCourse,
    addCourse,
    editCourse,
    setSemesterName,
    skipSemester,
    unskipSemester,
    moveFromFloatingCourses,
    IsSave,
    updateSwitch
}: {
    courses: Course[];
    plans: Plan[];
    addPlan: () => void;
    deletePlan: (planID: number) => void;
    setPlanName: (planID: number, name: string) => void;
    addSemester: (planID: number) => void;
    removeSemester: (planID: number, semester: Semester) => void;
    removeSemesterCourses: (planID: number, semester: Semester) => void;
    clearSemesters: (planID: number) => void;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    addCourse: (planID: number, semesterID: number, course: Course) => void;
    editCourse: (
        planID: number,
        semesterID: number,
        isRequired: boolean,
        course: Course
    ) => void;
    setSemesterName: (
        planID: number,
        semesterID: number,
        semesterName: string
    ) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    unskipSemester: (planID: number, semester: Semester) => void;
    moveFromFloatingCourses: (
        planID: number,
        semester: Semester,
        course: Course,
        floatingCourses: Course[],
        takenCourses: Course[]
    ) => void;
    IsSave: boolean;
    updateSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
                        <Button
                            variant="outline-primary"
                            onClick={addPlan}
                            data-testid="Add-Plan-Button"
                        >
                            <div>Add Plan</div>
                        </Button>
                    </Nav.Item>
                    <Nav.Item style={{ margin: "10px" }}>
                        <Form.Check
                            type="switch"
                            id="saving"
                            label={IsSave ? "Saving" : "Unsaved"}
                            checked={IsSave}
                            onChange={updateSwitch}
                        />
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    {plans.map((plan: Plan) => (
                        <Tab.Pane key={plan.id} eventKey={plan.id}>
                            <ViewPlan
                                courses={courses}
                                plan={plan}
                                setPlanName={setPlanName}
                                addSemester={addSemester}
                                removeSemester={removeSemester}
                                removeSemesterCourses={removeSemesterCourses}
                                clearSemesters={clearSemesters}
                                removeCourse={removeCourse}
                                addCourse={addCourse}
                                editCourse={editCourse}
                                setSemesterName={setSemesterName}
                                skipSemester={skipSemester}
                                unskipSemester={unskipSemester}
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
