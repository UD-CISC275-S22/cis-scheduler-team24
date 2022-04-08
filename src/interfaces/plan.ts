import { Course } from "./course";
import { Semester } from "./semester";

export interface Plan {
    id: number;
    name: string;
    semesters: Semester[];
    requirements: Course[];
    taken_courses: Course[];
    floating_courses: Course[];
}
