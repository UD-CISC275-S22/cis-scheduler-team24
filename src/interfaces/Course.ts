export type BreadthType =
    | "Creative Arts and Humanities"
    | "History and Cultural Change"
    | "Social and Behavioral Sciences"
    | "Mathematics, Natural Sciences, and Technology";

export interface Course {
    courseID: string;
    name: string;
    credit: number;
    description: string;
    prerequisite: Course[];
    isTaken: boolean;
    isEditing: boolean;
    breadthType: BreadthType;
}
