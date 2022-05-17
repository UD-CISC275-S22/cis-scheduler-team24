import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { ListPlans } from "./listPlans";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

describe("ListPlans", () => {
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
        const examplecourse = [
            {
                id: 0,
                code: "",
                name: "",
                credits: 0,
                description: "",
                prerequisites: [],
                isTaken: false,
                isEditing: false,
                isRequired: true,
                breadthType: ""
            }
        ];
        render(
            <ListPlans
                courses={examplecourse}
                plans={oldplan}
                addPlan={() => []}
                deletePlan={() => []}
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

    test("test the Clicking of Save button", () => {
        const AddPlanButton = screen.getByTestId("Add-Plan-Button");
        AddPlanButton.click();
        expect(AddPlanButton).toBeEnabled;
    });

    test("Plan can be view", () => {
        const PlanName = screen.getAllByText(/Plan 1/i);
        expect(PlanName[0]).toBeInTheDocument;
    });

    test("Most plan names can be displayed", () => {
        const PlanName1 = screen.getAllByText(/Plan 1/i);
        const PlanName2 = screen.getAllByText(/Plan 2/i);
        expect(PlanName1[0]).toBeInTheDocument;
        expect(PlanName2[0]).toBeInTheDocument;
    });
});
