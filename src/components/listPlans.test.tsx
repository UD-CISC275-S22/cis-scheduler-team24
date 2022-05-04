import React from "react";
import { render, screen } from "@testing-library/react";
import { ListPlans } from "./listPlans";
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

describe("ListPlans tests", () => {
    beforeEach(() => {
        render(
            <ListPlans
                plans={PLANS}
                addPlan={function (): void {
                    throw new Error("Function not implemented.");
                }}
                deletePlan={function (): void {
                    throw new Error("Function not implemented.");
                }}
                setPlanName={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />
        );
    });

    test("There is a tab for a plan", () => {
        const planTab = screen.getByRole("tab", {
            name: /Plan 1/i
        });
        expect(planTab).toBeInTheDocument();
    });
    test("There is a tab for adding a plan", () => {
        const addButton = screen.getByRole("button", {
            name: /Add Plan/i
        });
        expect(addButton).toBeInTheDocument();
    });
    test("Clicking add adds another plan tab", () => {
        const addButton = screen.getByRole("button", {
            name: /Add Plan/i
        });
        expect(screen.getAllByRole("tab")).toHaveLength(2);
        addButton.click();
        expect(screen.getAllByRole("tab")).toHaveLength(2);
    });
});
