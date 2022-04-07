import { Course } from "./Course";
export type SessionType =
    | "Fall semester"
    | "Winter semester"
    | "Spring semester"
    | "Summer semester";
export interface Semester {
    name: string;
    year: number;
    session: SessionType;
    courses: Course[];
    totalCredits: number;
    isSkiped: boolean;
}
