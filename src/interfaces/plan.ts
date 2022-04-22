import { Semester } from "./semester";

export interface Plan {
    id: number;
    name: string;
    semesters: Semester[];
    requirements: number[];
    taken_courses: number[];
    floating_courses: number[];
}
