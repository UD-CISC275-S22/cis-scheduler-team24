import React from "react";
import { render, screen } from "@testing-library/react";
import { ListCourses } from "./listCourses";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

describe("listCourses", () => {
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
        <ListCourses
            semester={oldplan[0].semesters[0]}
            allCourses={[]}
            semesterCourses={[]}
            floatingCourses={[]}
            requiredCourses={[]}
            setFloats={() => []}
            setRequirements={() => []}
            removeSemesterCourses={() => []}
            updateCourses={() => []}
            updateSemesterCourses={() => []}
            Noskip={() => []}
        />
    );
    test("test the button", () => {
        const savebutton = screen.getByRole("button", { name: /Add Course/i });
        savebutton.click();
    });
});
