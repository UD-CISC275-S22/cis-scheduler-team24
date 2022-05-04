import React from "react";
import { render, screen } from "@testing-library/react";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { EditSemester } from "./editSemester";

describe("editSemesters", () => {
    const oldplan = plans.map(
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
    render(
        <EditSemester
            semester={oldplan[0].semesters[0]}
            setSemesterName={(id: number, name: string) => {
                oldplan[0].semesters[0].id, name;
            }}
            openEdit={() => []}
        />
    );
    test("test the HTML input", () => {
        const htmlinput = screen.getByTestId("editSemester");
        htmlinput.click();
        expect(htmlinput).toBeEnabled;
    });
});
