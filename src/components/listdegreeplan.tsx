import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { Viewdegreeplan } from "./Viewdegreeplan";

export function Listdegreeplan({ plan }: { plan: Plan }): JSX.Element {
    const [semesters /*setSemesters*/] = useState<Semester[]>(plan.semesters);
    return (
        <div>
            <Container>
                {semesters.map((semester: Semester) => (
                    <div key={semester.id}>
                        <Viewdegreeplan semester={semester}></Viewdegreeplan>
                    </div>
                ))}
            </Container>
        </div>
    );
}
