import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ListSemesters } from "./listSemesters";

describe("ListSemesters", () => {
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

        const course = [
            {
                id: 0,
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
            <ListSemesters
                planSemesters={oldplan[0].semesters}
                courses={course}
                floatingCourses={[]}
                requiredCourses={[]}
                takenCourses={[]}
                planID={0}
                addSemester={() => []}
                removeSemester={() => []}
                removeSemesterCourses={() => []}
                removeCourse={() => []}
                addCourse={() => []}
                editCourse={() => []}
                setSemesterName={() => []}
                skipSemester={() => []}
                unskipSemester={() => []}
            />
        );
    });

    afterEach(cleanup);

    test("test the 🖊 button", () => {
        const EditButton = screen.getAllByText(/🖊/i);
        expect(EditButton[0]).toBeEnabled;
    });

    test("Clicking the 🖊 button", () => {
        const EditButton = screen.getAllByText(/🖊/i);
        EditButton[0].click();
        expect(/Save/i).toBeInTheDocument;
    });

    test("Clicking the Add Semester button", () => {
        const Addbutton = screen.getByRole("button", {
            name: /Add Semester/i
        });
        Addbutton.click();
        expect(Addbutton).toBeInTheDocument;
    });
});
