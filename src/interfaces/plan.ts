import { Semester } from "./semester";
import { Course } from "./course";

/** A representation of a Plan within the College Planner **/
export interface Plan {
    name: string; //Name of Plan
    semesters: Semester[]; //Semesters within the plan
    requirements: Course[]; //Required courses for student
    taken_courses: Course[]; //Courses the student has already taken
    floating_courses: Course[]; //Courses not assigned to any semester
}
