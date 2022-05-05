import React from "react";
import { render, screen } from "@testing-library/react";
import { ListSemesters } from "./listSemesters";
import { cleanup } from "@testing-library/react";

describe("ListSemestersl tests", () => {
    const PLANSemesters = [
        {
            id: 1,
            name: "",
            year: 2022,
            session: "Spring",
            courses: [181, 121, 141],
            totalCredits: 9,
            isSkipped: false
        },
        {
            id: 1,
            name: "",
            year: 2022,
            session: "Spring",
            courses: [181, 121, 141],
            totalCredits: 9,
            isSkipped: false
        }
    ];

    beforeEach(() => {
        render(
            <ListSemesters
                planSemesters={PLANSemesters}
                courses={[]}
                floatingCourses={[]}
                requiredCourses={[]}
                addSemester={() => []}
                removeSemester={() => []}
                setSemesterName={() => []}
                setFloats={() => []}
                setRequirements={() => []}
                updateCourses={() => []}
            />
        );
    });

    afterEach(cleanup);

    test("There is a button labeled 🖊", () => {
        const EditButton = screen.getAllByRole("button", {
            name: /🖊/i
        });
        expect(EditButton[1]).toBeInTheDocument();
    });

    test("Clicking a  button labeled 🖊", () => {
        const EditButton = screen.getAllByRole("button", {
            name: /🖊/i
        });
        EditButton[1].click();
        const SaveButton = screen.getAllByRole("button", {
            name: /Save/i
        });
        SaveButton[1].click();
        const AddSemesterButton = screen.getByRole("button", {
            name: /Add Semester/i
        });
        expect(AddSemesterButton).toBeInTheDocument();
    });

    test("There is a button labeled Add Semester", () => {
        const AddSemesterButton = screen.getByRole("button", {
            name: /Add Semester/i
        });
        AddSemesterButton.click();
        expect(AddSemesterButton).toBeInTheDocument();
    });
});
