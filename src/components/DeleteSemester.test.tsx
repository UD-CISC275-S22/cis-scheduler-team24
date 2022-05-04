import React from "react";
import { render, screen } from "@testing-library/react";
import { DeleteSemester } from "./DeleteSemester";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { Plan } from "../interfaces/plan";
import courses from "../data/course–book.json";
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

const COURSES = courses.map(
    (course): Course => ({
        ...course,
        prerequisites: course.prerequisites.map(Number)
    })
);

const REQUIREMENTS = COURSES.filter(
    (course: Course): boolean => course.isRequired
);

const FLOATING = COURSES.filter((course: Course): boolean => !course.isTaken);

describe("DeleteSemester tests", () => {
    beforeEach(() => {
        render(
            <DeleteSemester
                semester={PLANS[0].semesters[0]}
                removeSemester={() => []}
                setFloats={() => []}
                setRequirements={() => []}
                courses={COURSES}
                requiredCourses={REQUIREMENTS}
                floatingCourses={FLOATING}
            />
        );
    });

    test("There is a delete button", () => {
        const deleteButton = screen.getByRole("button", {
            name: /✖️/i
        });
        deleteButton.click();
        expect(deleteButton).toBeEnabled();
    });
});
