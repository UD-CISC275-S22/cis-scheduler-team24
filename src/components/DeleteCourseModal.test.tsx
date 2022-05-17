import React from "react";
import { render, screen } from "@testing-library/react";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { cleanup } from "@testing-library/react";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

describe("DeleteCourseModal tests", () => {
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
            <DeleteCourseModal
                removeSemesterCourses={() => []}
                planID={0}
                semester={oldplan[0].semesters[0]}
            />
        );
    });

    afterEach(cleanup);

    test("There is a button labeled Delete All Course", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        expect(DeleteButton).toBeInTheDocument();
    });

    test("Clicking Delete All Course button show the warning modal", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button show a button labeled Cancel", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        expect(CancelButton).toBeInTheDocument();
    });

    test("Clicking Cancel button close the the warning modal", () => {
        const DeleteButton = screen.getByRole("button", {
            name: /Delete All Course/i
        });
        DeleteButton.click();
        const CancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        CancelButton.click();
        const answerText = screen.queryByText(/⚠️/);
        expect(answerText).toBeInTheDocument();
    });

    test("Clicking Clear Semesters button show a button labeled Delete All Courses", () => {
        const DeleteButton = screen.getAllByRole("button", {
            name: /Delete All Courses/i
        });
        DeleteButton[0].click();
        const DeleteAllButton = screen.getAllByRole("button", {
            name: /Delete All Courses/i
        });
        DeleteAllButton[0].click();
        expect(DeleteAllButton[0]).toBeInTheDocument();
    });
});
