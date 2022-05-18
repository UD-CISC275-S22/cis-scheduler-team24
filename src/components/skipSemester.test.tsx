import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { SkipSemester } from "./skipSemester";

describe("SkipSemester", () => {
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
            <SkipSemester
                isSkipped={false}
                planID={1}
                semester={oldplan[0].semesters[0]}
                setSkipped={() => []}
                skipSemester={() => []}
                unskipSemester={() => []}
            />
        );
    });

    afterEach(cleanup);

    test("test the skip button", () => {
        const SkipButton1 = screen.getByRole("checkbox", {
            name: /Skip/i
        });
        SkipButton1.click();
        expect(SkipButton1).toBeEnabled;
        const SkipButton2 = screen.getByRole("checkbox", {
            name: /Skip/i
        });
        SkipButton2.click();
        expect(SkipButton2).toBeEnabled;
    });
});
