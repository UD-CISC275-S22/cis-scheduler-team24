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
                    plan.id === id ? addSemester2(plan) : { ...plan }
            )
        );
    }

    //Helper function for addSemester
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

    //Helper function for removeSemester
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

    function clearSemesters(planID: number): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === planID ? clearSemesters2(plan) : plan
            )
        );
    }

    function clearSemesters2(plan: Plan): Plan {
        return {
            ...plan,
            semesters: [],
            floating_courses: courses.map(
                (course: Course): number => course.id
            ),
            taken_courses: []
        };
    }

    function setSemesterName(
        planID: number,
        semesterID: number,
        semesterName: string
    ): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    plan.id === planID
                        ? setSemesterName2(plan, semesterID, semesterName)
                        : plan
            )
        );
    }

    //Helper function for setSemesterName
    function setSemesterName2(
        plan: Plan,
        semesterID: number,
        semesterName: string
    ): Plan {
        return {
            ...plan,
            semesters: plan.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === semesterID
                        ? { ...semester, name: semesterName }
                        : semester
            )
        };
    }

    function setFloatingCourses(planID: number, floats: Course[]): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    planID === plan.id
                        ? setFloatingCourses2(plan, floats)
                        : plan
            )
        );
    }

    function setFloatingCourses2(plan: Plan, floats: Course[]): Plan {
        return {
            ...plan,
            floating_courses: [
                ...floats.map((course: Course): number => course.id)
            ]
        };
    }

    function setRequiredCourses(planID: number, requirements: Course[]): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    planID === plan.id
                        ? setRequiredCourses2(plan, requirements)
                        : plan
            )
        );
    }

    function setRequiredCourses2(plan: Plan, requirements: Course[]): Plan {
        return {
            ...plan,
            requirements: [
                ...requirements.map((course: Course): number => course.id)
            ]
        };
    }

    function setTakenCourses(planID: number, takenCourses: Course[]): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    planID === plan.id
                        ? setTakenCourses2(plan, takenCourses)
                        : plan
            )
        );
    }

    function setTakenCourses2(plan: Plan, takenCourses: Course[]): Plan {
        return {
            ...plan,
            taken_courses: [
                ...takenCourses.map((course: Course): number => course.id)
            ]
        };
    }

    function setSemesterCourses(
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ): void {
        setPlans(
            plans.map(
                (plan: Plan): Plan =>
                    planID === plan.id
                        ? setSemesterCourses2(plan, semesterID, semesterCourses)
                        : plan
            )
        );
    }

    function setSemesterCourses2(
        plan: Plan,
        semesterID: number,
        semesterCourses: Course[]
    ): Plan {
        return {
            ...plan,
            semesters: [
                ...plan.semesters.map(
                    (semester: Semester): Semester =>
                        semester.id === semesterID
                            ? setSemesterCourses3(semester, semesterCourses)
                            : semester
                )
            ]
        };
    }

    function setSemesterCourses3(
        semester: Semester,
        semesterCourses: Course[]
    ): Semester {
        return {
            ...semester,
            courses: [
                ...semesterCourses.map((course: Course): number => course.id)
            ]
        };
    }

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
                            addSemester={addSemester}
                            removeSemester={removeSemester}
                            clearSemesters={clearSemesters}
                            setSemesterName={setSemesterName}
                            setFloatingCourses={setFloatingCourses}
                            setRequiredCourses={setRequiredCourses}
                            setTakenCourses={setTakenCourses}
                            setSemesterCourses={setSemesterCourses}
                        ></ListPlans>
                    </Col>
                </Row>
            </div>
            <ExportPlans courses={courses} plans={plans}></ExportPlans>
        </div>
    );
}

export default App;
