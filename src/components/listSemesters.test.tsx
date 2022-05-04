import React from "react";
import { render, screen } from "@testing-library/react";
import { ListSemesters } from "./listSemesters";
import { cleanup } from "@testing-library/react";

describe("ListSemestersl tests", () => {
    beforeEach(() => {
        render(
            <ListSemesters
                planSemesters={[]}
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

    test("There is a button labeled Add Semester", () => {
        const AddButton = screen.getByRole("button", {
            name: /Add Semester/i
        });
        expect(AddButton).toBeInTheDocument();
    });
});
