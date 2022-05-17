import React from "react";
import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import plans from "../data/plans.json";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ExportPlans } from "./exportPlans";

describe("ExportPlans tests", () => {
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
        render(<ExportPlans courses={examplecourse} plans={oldplan} />);
    });

    afterEach(cleanup);

    test("test the Download Courses Button", () => {
        const DownloadCoursesButton = screen.getByTestId("DownloadCourses");
        expect(DownloadCoursesButton).toBeInTheDocument;
    });

    test("Clicking the Download Courses Button", () => {
        const DownloadCoursesButton = screen.getByTestId("DownloadCourses");
        DownloadCoursesButton.click();
        expect(DownloadCoursesButton).toBeEnabled;
    });

    test("test the Download Download Plans Button", () => {
        const DownloadPlansButton = screen.getByTestId("DownloadPlans");
        expect(DownloadPlansButton).toBeInTheDocument;
    });

    test("Clicking the Download Download Plans Button", () => {
        const DownloadPlansButton = screen.getByTestId("DownloadPlans");
        DownloadPlansButton.click();
        expect(DownloadPlansButton).toBeEnabled;
    });
});
