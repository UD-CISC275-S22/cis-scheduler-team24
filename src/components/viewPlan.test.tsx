import React from "react";
import { render, screen } from "@testing-library/react";
import { ViewPlan } from "./viewPlan";
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

describe("ViewPlan tests", () => {
    beforeEach(() => {
        render(
            <ViewPlan
                plan={PLANS[0]}
                setPlanName={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />
        );
    });

    test("There is a clear semesters button", () => {
        const clearButton = screen.getByRole("button", {
            name: /Clear Semesters/i
        });
        expect(clearButton).toBeInTheDocument();
    });
    test("There is a table of semester lists", () => {
        const semesterName = screen.getByRole("button", {
            name: "Fall, 2019 🖊 ✖️"
        });
        expect(semesterName).toBeInTheDocument();
    });
    test("There is a pool of floating courses", () => {
        const floatingPool = screen.getByTestId("floating-text");
        expect(floatingPool).toBeInTheDocument();
    });
    test("There is a table of required courses", () => {
        const requiredCourses = screen.getByTestId("required-text");
        expect(requiredCourses).toBeInTheDocument();
    });
});
