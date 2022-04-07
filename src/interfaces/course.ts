export type BreadthType = "A" | "B" | "C" | "D" | "N";

/** A representation of a course within the College Planner **/
export interface Course {
    id: number; //Unique id of course
    name: string; //Name of course
    numCredits: number; //Number of credits the course is worth
    description: string; //Description of course
    prerequisites: Course[]; //Courses required to take this course
    isTaken: boolean; //Whether or not the course is currently part of a semester
    isEditing: boolean; //Whether the course is being edited right now
    breadthType: BreadthType; //The type of breadth credit the course gives
}
