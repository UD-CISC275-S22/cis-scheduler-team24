import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./App.css";
import { Plan } from "./interfaces/plan";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import { ListPlans } from "./components/listPlans";
import { Carouse } from "./components/Carouse";
import { GreetingMessage } from "./components/greetingMessage";
import { ExportPlans } from "./components/exportPlans";
import courses from "./data/course–book.json";
import plans from "./data/plans.json";

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
                courses: semester.courses.map(Number)
            })
        ),
        requirements: plan.requirements.map(Number),
        taken_courses: plan.taken_courses.map(Number)
    })
);

// const oldplans = PLANS;
// const saveDataKey = "MY-PAGE-DATA";
// const previousData = localStorage.getItem(saveDataKey);
// if (previousData !== null) {
//     oldplans = JSON.parse(previousData);
// }

function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(PLANS);
    const [courses, setCourses] = useState<Course[]>(COURSES);

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
                    ...courses.map((course: Course): number => course.id)
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

    function addSemester(id: number): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === id
                        ? {
                              ...plan,
                              semesters: [
                                  ...plan.semesters,
                                  {
                                      id: plan.semesters.length + 1,
                                      name: "New Semester",
                                      year: 0,
                                      session: "Smarch",
                                      courses: [],
                                      totalCredits: 0,
                                      isSkipped: false
                                  }
                              ]
                          }
                        : { ...plan }
            )
        );
    }

    //Added this helper function because it was giving me that annoying "2 spaces expected" error and I'm running out of time
    function addSemester2(plan: Plan): Plan {
        return {
            ...plan,
            semesters: [
                ...plan.semesters,
                {
                    id: plan.semesters.length + 1,
                    name: "New Semester",
                    year: 0,
                    session: "Smarch",
                    courses: [],
                    totalCredits: 0,
                    isSkipped: false
                }
            ]
        };
    }

    function removeSemester(planID: number, semesterID: number): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === planID
                        ? removeSemester2(plan, semesterID)
                        : plan
            )
        );
    }

    //Same deal with this helper function
    function removeSemester2(plan: Plan, semesterID: number): Plan {
        return {
            ...plan,
            semesters: [
                ...plan.semesters.filter(
                    (semester: Semester): boolean => semester.id !== semesterID
                )
            ]
        };
    }

    function clearSemesters(id: number): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === id ? { ...plan, semesters: [] } : plan
            )
        );
        /*
        setFloats(
            courses.map(
                (course: Course): Course => ({
                    ...course,
                    prerequisites: course.prerequisites.map(Number)
                })
            )
        );
        setRequirements(
            requiredCourses.map(
                (course: Course): Course => ({
                    ...course,
                    prerequisites: course.prerequisites.map(Number)
                })
            )
        );
        setTakenCourses([]);
        */
    }

    /*
    function setSemesterName(
        planID: number,
        semesterID: number,
        semesterName: string
    ): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === planID
                        ? {
                              ...plan,
                              semesters: setSemesterName2()
                          }
                        : plan
            )
        );
    }

    function setSemesterName2(
        semesters: Semester[],
        semesterID: number,
        semesterName: string
    ): Semester[] {
        return semesters.map(
            (semester: Semester): Semester =>
                semester.id === semesterID
                    ? { ...semester, name: semesterName }
                    : semester
        );
    }
    */

    // function saveData() {
    //     localStorage.setItem(saveDataKey, JSON.stringify(plans));
    // }

    // function convertToCSV(allcourses) {
    //     const array = [Object.keys(allcourses[0])].concat(allcourses)
    //     return allcourses.map(it => {
    //         return Object.values(it).toString()}).join('\n')
    //     }
    // }

    return (
        <div className="App">
            <Carouse></Carouse>
            <GreetingMessage></GreetingMessage>
            <div>
                <Row>
                    <Col>
                        <ListPlans
                            courses={courses}
                            plans={plans}
                            setCourses={setCourses}
                            addPlan={addPlan}
                            deletePlan={deletePlan}
                            setPlanName={setPlanName}
                        ></ListPlans>
                    </Col>
                </Row>
            </div>
            <ExportPlans courses={courses} plans={plans}></ExportPlans>
        </div>
    );
}

export default App;
