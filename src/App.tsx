import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./App.css";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { ListPlans } from "./components/listPlans";
import { Carouse } from "./components/Carouse";
import { GreetingMessage } from "./components/greetingMessage";
import plans from "./data/plans.json";
import coursebook from "./data/course–book.json";
import { Course } from "./interfaces/course";

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
    // function saveData() {
    //     localStorage.setItem(saveDataKey, JSON.stringify(plans));
    // }

    // function convertToCSV(allcourses) {
    //     const array = [Object.keys(allcourses[0])].concat(allcourses)
    //     return allcourses.map(it => {
    //         return Object.values(it).toString()}).join('\n')
    //     }
    // }

    const exportCSV = (coursebook: Array<Course>) => {
        let str =
            "id, name, credits, description, prerequisites, isEditing, isRequired, breadthType";
        for (let i = 0; i < coursebook.length; i++) {
            const data = coursebook[i];
            str += i + 1 + ",";
            str += data.name.replace(",", "-") + ",";
            str += data.credits + ",";
            str += data.description + ",";
            str += data.prerequisites + ",";
            str += data.isEditing + ",";
            str += data.breadthType + ".";
            str += "\n";
        }

        const uri =
            "data:text/csv;charaset=utf-8,\ufeff" + encodeURIComponent(str);
        const link = document.createElement("a");
        link.href = uri;
        link.download = "coursebook";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPlanCSV = (plans: Array<Plan>) => {
        let str =
            "id, name, , , , semesters, ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , , , , , requirements, taken_courses, floating_courses";

        for (let i = 0; i < plans.length; i++) {
            const data = plans[i];
            str += i + "," + "\n";
            str += data.id + ",";
            str += data.name.replace(",", "-") + ",";
            for (let j = 0; j < data.semesters.length; j++) {
                if (j < 1) {
                    str +=
                        "," +
                        "," +
                        "," +
                        "," +
                        "," +
                        data.semesters[j].id +
                        "," +
                        data.semesters[j].name +
                        "," +
                        data.semesters[j].year +
                        "," +
                        data.semesters[j].session +
                        "," +
                        data.semesters[j].courses +
                        "," +
                        data.semesters[j].totalCredits +
                        "," +
                        data.semesters[j].isSkipped +
                        "," +
                        "\n";
                } else {
                    str +=
                        "," +
                        "," +
                        "," +
                        "," +
                        "," +
                        "," +
                        "," +
                        data.semesters[j].id +
                        "," +
                        data.semesters[j].name +
                        "," +
                        data.semesters[j].year +
                        "," +
                        data.semesters[j].session +
                        "," +
                        data.semesters[j].courses +
                        "," +
                        data.semesters[j].totalCredits +
                        "," +
                        data.semesters[j].isSkipped +
                        "," +
                        "\n";
                }
            }
            for (let l = 0; l < 21; l++) {
                str += ",";
            }
            for (let k = 0; k < data.requirements.length; k++) {
                str += data.requirements[k] + "-";
            }
            str += ",";
            for (let f = 0; f < data.taken_courses.length; f++) {
                str += data.taken_courses[f] + "-";
            }
            str += ",";
            for (let u = 0; u < data.floating_courses.length; u++) {
                str += data.floating_courses[u] + "-";
            }
            str += "\n";
        }
        const uri =
            "data:text/csv;charaset=utf-8,\ufeff" + encodeURIComponent(str);
        const link = document.createElement("a");
        link.href = uri;
        link.download = "plans";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="App">
            <Carouse></Carouse>
            <GreetingMessage></GreetingMessage>
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
                <div>
                    <Button onClick={() => exportCSV(coursebook)}>
                        Download courses refeneces
                    </Button>
                    <Button onClick={() => exportPlanCSV(plans)}>
                        Download plans
                    </Button>{" "}
                </div>
            </div>
        </div>
    );
}

export default App;
