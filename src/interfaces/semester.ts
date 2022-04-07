import { Course } from "./Course";
//export type SessionType = "Fall" | "Winter" | "Spring" | "Summer";

export interface Semester {
    name: string;
    year: number;
    session: string;
    courses: Course[];
    totalCredits: number;
    isSkipped: boolean;
}
