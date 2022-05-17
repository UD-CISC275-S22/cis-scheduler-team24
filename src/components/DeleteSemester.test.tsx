import React from "react";
import { render, screen } from "@testing-library/react";
import { DeleteSemester } from "./DeleteSemester";
import { Semester } from "../interfaces/semester";
import { Plan } from "../interfaces/plan";
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

describe("DeleteSemester tests", () => {
    beforeEach(() => {
        render(
            <DeleteSemester
                semester={PLANS[0].semesters[0]}
                planID={0}
                removeSemester={() => []}
            />
        );
    });

    test("There is a delete button", () => {
        const deleteButton = screen.getByText(/✖️/i);
        deleteButton.click();
        expect(deleteButton).toBeEnabled();
    });
});
