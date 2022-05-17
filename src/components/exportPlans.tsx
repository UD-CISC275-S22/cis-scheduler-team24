import React from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Course } from "../interfaces/course";

export function ExportPlans({
    courses,
    plans
}: {
    courses: Course[];
    plans: Plan[];
}): JSX.Element {
    const exportCSV = (coursebook: Array<Course>) => {
        let str =
            "id, code, name, credits, description, prerequisites, isEditing, isRequired, breadthType";
        for (let i = 0; i < coursebook.length; i++) {
            const data = coursebook[i];
            str += i + 1 + ",";
            str += data.code.replace(",", "-") + ",";
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
        <div className="export-button">
            <Button
                variant="secondary"
                style={{ margin: "5px" }}
                onClick={() => exportCSV(courses)}
            >
                Download all courses
            </Button>
            <Button
                variant="secondary"
                style={{ margin: "5px" }}
                onClick={() => exportPlanCSV(plans)}
            >
                Download all plans
            </Button>
        </div>
    );
}
