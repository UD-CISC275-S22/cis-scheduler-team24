import React from "react";
import { render, screen } from "@testing-library/react";
import { EditPlan } from "./editPlan";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import userEvent from "@testing-library/user-event";

describe("edit plan", () => {
    beforeEach(() => {
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
            <EditPlan
                plan={oldplan[0]}
                setPlanName={(id: number, name: string) => {
                    oldplan[0].id, name;
                }}
                openEdit={() => []}
            />
        );
    });
    test("test the button", () => {
        const savebutton = screen.getByRole("button", { name: /Save/i });
        savebutton.click();
    });

    test("test the HTML input", () => {
        const htmlinput = screen.getByTestId("editplan");
        userEvent.type(htmlinput, "CISC275");
        const savebutton = screen.getByRole("button", {
            name: /Save/i
        });
        savebutton.click();
        expect(htmlinput).toBeEnabled;
    });
});
