import React from "react";
import { render, screen } from "@testing-library/react";
import { ViewSemester } from "./viewSemester";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

describe("viewSemester", () => {
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
        <ViewSemester
            semester={oldplan[0].semesters[0]}
            courses={[]}
            floatingCourses={[]}
            requiredCourses={[]}
            setFloats={() => []}
            setRequirements={() => []}
            updateCourses={() => []}
        />
    );
    test("Whether there is a Credit showing up on screen", () => {
        const showfloatingcorses = screen.queryByText(/1 (.*)/i);
        expect(showfloatingcorses).toBeNull();
    });
});
