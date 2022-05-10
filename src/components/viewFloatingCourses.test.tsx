import React from "react";
import { render, screen /*, within */ } from "@testing-library/react";
import { ViewFloatingCourses } from "./viewFloatingCourses";
import { Course } from "../interfaces/course";
import courses from "../data/course–book.json";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

describe("ViewFloatingCourses", () => {
    beforeEach(() => {
        const floatingCourses = courses.filter(
            (course: Course): boolean => !course.isTaken
        );
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
            <ViewFloatingCourses
                floatingCourses={floatingCourses}
                setFloats={() => []}
                addedCourse={() => floatingCourses[0]}
                semester={oldplan[0].semesters[0]}
            />
        );
    });
    test("There is a Table", () => {
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
    });
});
