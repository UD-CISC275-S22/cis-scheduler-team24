import { Course } from "./Course";
import { Semester } from "./Semester";

export interface Plan {
    name: string;
    semester: Semester[];
    requirements: Course[];
    floating_courses: Course[];
}
