import { Course } from "./Course";
import { Semester } from "./Semester";

export interface Plan {
    name: string;
    semesters: Semester[];
    requirements: Course[];
    taken_courses: Course[];
    floating_courses: Course[];
}
