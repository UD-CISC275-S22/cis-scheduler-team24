import React, { useState } from "react";
import { Container, Button, Table, Stack, Col, Row } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListSemesters } from "./listSemesters";
import { EditPlan } from "./editPlan";
import { ClearSemesterModal } from "./ClearSemesterModal";
import { ViewRequirements } from "./viewRequirements";
import { ViewFloatingCourses } from "./viewFloatingCourses";

export function ViewPlan({
    courses,
    plan,
    setCourses,
    setPlanName
}: {
    courses: Course[];
    plan: Plan;
    setCourses: (courses: Course[]) => void;
    setPlanName: (id: number, name: string) => void;
}): JSX.Element {
    const [semesters, setSemesters] = useState<Semester[]>(plan.semesters);
    const [isEditing, setEditing] = useState<boolean>(false);

    const [floatingCourses, setFloatingCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            plan.floating_courses.includes(course.id)
        )
    );
    const [requiredCourses, setRequiredCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            plan.requirements.includes(course.id)
        )
    );
    const [takenCourses, setTakenCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            plan.taken_courses.includes(course.id)
        )
    );

    function openEdit(): void {
        setEditing(!isEditing);
    }

    function addSemester(): void {
        setSemesters([
            ...semesters,
            {
                id: semesters.length + 1,
                name: "New Semester",
                year: 0,
                session: "Smarch",
                courses: [],
                totalCredits: 0,
                isSkipped: false
            }
        ]);
    }

    function removeSemester(id: number): void {
        setSemesters(
            semesters.filter(
                (semester: Semester): boolean => semester.id !== id
            )
        );
    }

    function clearSemesters(): void {
        setSemesters([]);
        setFloats(
            courses.map(
                (course: Course): Course => ({
                    ...course,
                    prerequisites: course.prerequisites.map(Number)
                })
            )
        );
        setRequirements(
            requiredCourses.map(
                (course: Course): Course => ({
                    ...course,
                    prerequisites: course.prerequisites.map(Number)
                })
            )
        );
        setTakenCourses([]);
    }

    function setSemesterName(id: number, name: string): void {
        setSemesters(
            semesters.map(
                (semester: Semester): Semester =>
                    semester.id === id ? { ...semester, name: name } : semester
            )
        );
    }

    function setRequirements(newReqs: Course[]): void {
        setRequiredCourses(newReqs);
    }

    function setFloats(newFloats: Course[]): void {
        setFloatingCourses(newFloats);
    }

    function updateCourses(newCourse: Course): void {
        setCourses([...courses, newCourse]);
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col sm={9}>
                        <Table striped borderless>
                            <thead>
                                <tr>
                                    <th>
                                        <span>
                                            <Stack
                                                direction="horizontal"
                                                gap={3}
                                            >
                                                <Container>
                                                    <div>
                                                        {isEditing ? (
                                                            <EditPlan
                                                                plan={plan}
                                                                setPlanName={
                                                                    setPlanName
                                                                }
                                                                openEdit={
                                                                    openEdit
                                                                }
                                                            ></EditPlan>
                                                        ) : (
                                                            <div>
                                                                <h3>
                                                                    {plan.name}
                                                                    <Button
                                                                        onClick={
                                                                            openEdit
                                                                        }
                                                                        variant="empty"
                                                                        className="me-8"
                                                                        data-testid="Edit Plan Name Button"
                                                                    >
                                                                        🖊
                                                                    </Button>
                                                                </h3>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Container>
                                            </Stack>
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <ListSemesters
                                            planSemesters={semesters}
                                            courses={courses}
                                            floatingCourses={floatingCourses}
                                            requiredCourses={requiredCourses}
                                            takenCourses={takenCourses}
                                            addSemester={addSemester}
                                            removeSemester={removeSemester}
                                            setSemesterName={setSemesterName}
                                            setFloats={setFloats}
                                            setRequirements={setRequirements}
                                            setTakenCourses={setTakenCourses}
                                            updateCourses={updateCourses}
                                        ></ListSemesters>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <ClearSemesterModal
                            clearSemesters={clearSemesters}
                        ></ClearSemesterModal>
                    </Col>
                    <Col sm={3}>
                        <div>
                            <span data-testid="floating-text">
                                Floating Courses:
                            </span>
                            <ViewFloatingCourses
                                floatingCourses={floatingCourses}
                                takenCourses={takenCourses}
                                setFloats={setFloats}
                                setTakenCourses={setTakenCourses}
                                semesters={semesters}
                            ></ViewFloatingCourses>
                            <span data-testid="required-text">
                                Required Courses:
                            </span>
                            <ViewRequirements
                                requirements={requiredCourses}
                                takenCourses={takenCourses}
                            ></ViewRequirements>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
