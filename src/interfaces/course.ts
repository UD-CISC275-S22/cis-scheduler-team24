//export type BreadthType = "A" | "B" | "C" | "D";

export interface Course {
    id: number;
    name: string;
    credits: number;
    description: string;
    prerequisites: Course[];
    isTaken: boolean;
    isEditing: boolean;
    breadthType: string;
}
