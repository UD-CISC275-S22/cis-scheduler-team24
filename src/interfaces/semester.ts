//export type SessionType = "Fall" | "Winter" | "Spring" | "Summer";

export interface Semester {
    id: number;
    name: string;
    year: number;
    session: string;
    courses: number[];
    totalCredits: number;
    isSkipped: boolean;
}
