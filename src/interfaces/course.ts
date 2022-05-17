//export type BreadthType = "A" | "B" | "C" | "D";

export interface Course {
    id: number;
    name: string;
    credits: number;
    description: string;
    prerequisites: number[];
    isEditing: boolean;
    breadthType: string;
}
