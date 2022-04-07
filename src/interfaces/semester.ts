import { Course } from "./course";
//export type SessionType = "Fall" | "Winter" | "Spring" | "Summer";

export interface Semester {
    id: number;
    name: string;
    year: number;
    session: string;
    courses: Course[];
    totalCredits: number;
    isSkipped: boolean;
}
