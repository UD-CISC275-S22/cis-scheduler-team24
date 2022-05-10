import React from "react";
import { render, screen } from "@testing-library/react";
import { DeletePlan } from "./deletePlan";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import plans from "../data/plans.json";

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

describe("DeletePlan tests", () => {
    beforeEach(() => {
        render(<DeletePlan plan={PLANS[0]} deletePlan={() => []} />);
    });

    test("There is a delete button", () => {
        const deleteButton = screen.getByRole("button", {
            name: /✖️/i
        });
        deleteButton.click();
        expect(deleteButton).toBeInTheDocument();
    });
});
