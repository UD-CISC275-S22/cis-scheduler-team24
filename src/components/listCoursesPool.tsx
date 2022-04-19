import React, { useState } from "react";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ViewCoursesPool } from "./ViewCoursesPool";

export function ListCoursesPool({ plan }: { plan: Plan }): JSX.Element {
    const [semesters /*setSemesters*/] = useState<Semester[]>(plan.semesters);
    return (
        <div>
            {semesters.map((semester: Semester) => (
                <div key={semester.id}>
                    <ViewCoursesPool semester={semester}></ViewCoursesPool>
                </div>
            ))}
        </div>
    );
}
