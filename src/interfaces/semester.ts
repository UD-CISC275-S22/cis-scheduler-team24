import { Course } from "./course";

export type SessionType = "Winter" | "Spring" | "Summer" | "Fall";

/** A representation of a Semester within the College Planner **/
export interface Semester {
    name: string; //Name of semester
    year: number; //Year of semester
    session: SessionType; //Session of semester
    courses: Course[]; //Courses in the semester
    totalCredits: number; //Number of credits taken in the semester
    isSkipped: boolean; //Whether or not the semester is being "skipped"
}
