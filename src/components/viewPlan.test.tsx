import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { ViewPlan } from "./viewPlan";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import userEvent from "@testing-library/user-event";

describe("ViewPlan", () => {
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
            <ViewPlan
                courses={[]}
                plan={oldplan[0]}
                setPlanName={() => []}
                addSemester={() => []}
                removeSemester={() => []}
                removeSemesterCourses={() => []}
                clearSemesters={() => []}
                removeCourse={() => []}
                addCourse={() => []}
                editCourse={() => []}
                setSemesterName={() => []}
                skipSemester={() => []}
                unskipSemester={() => []}
                moveFromFloatingCourses={() => []}
            />
        );
    });

    afterEach(cleanup);

    test("test Edit PLan name", () => {
        const PlanName = screen.getByText(/Plan 1/i);
        expect(PlanName).toBeInTheDocument;
        const EditPlanName = screen.getByTestId("Edit Plan Name Button");
        expect(EditPlanName).toBeInTheDocument;
        EditPlanName.click();
        const editplan = screen.getByTestId("editplan");
        userEvent.type(editplan, "CISC275");
        const editplansave = screen.getByTestId("editplan-save");
        editplansave.click();
        expect(EditPlanName).toBeEnabled;
    });
});
