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

let PLANS = plans.map(
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

const saveDatakey = "CISC275";

const previousData = localStorage.getItem(saveDatakey);

if (previousData !== null) {
    PLANS = JSON.parse(previousData);
}
function App(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>(PLANS);
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [content, setContent] = useState<string>("No file data uploaded");

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

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length) {
            const filename = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (loadEvent) => {
                const newContent =
                    loadEvent.target?.result || "Data was not loaded";

                setContent(newContent as string);
            };
            reader.readAsText(filename);
        }
    }

    function saveData() {
        localStorage.setItem(saveDatakey, JSON.stringify(plans));
    }

    if (plans.length > 1) {
        saveData();
    }
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
                            // setPlans={setPlans}
                        ></ListPlans>
                    </Col>
                </Row>
            </div>
            <ExportPlans
                courses={courses}
                plans={plans}
                content={content}
                uploadFile={uploadFile}
            ></ExportPlans>
        </div>
    );
}

export default App;
