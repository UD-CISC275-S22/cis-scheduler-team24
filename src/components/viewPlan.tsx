import React, { useState } from "react";
import { Container, Button, Table, Stack, Col, Row } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
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
    setPlanName,
    addSemester,
    removeSemester,
    clearSemesters,
    setSemesterName,
    setFloatingCourses,
    setRequiredCourses,
    setTakenCourses,
    setSemesterCourses
}: {
    courses: Course[];
    plan: Plan;
    setCourses: (courses: Course[]) => void;
    setPlanName: (id: number, name: string) => void;
    addSemester: (planID: number) => void;
    removeSemester: (planID: number, semesterID: number) => void;
    clearSemesters: (planID: number) => void;
    setSemesterName: (
        planID: number,
        semesterID: number,
        semesterName: string
    ) => void;
    setFloatingCourses: (planID: number, floats: Course[]) => void;
    setRequiredCourses: (planID: number, requirements: Course[]) => void;
    setTakenCourses: (planID: number, takenCourses: Course[]) => void;
    setSemesterCourses: (
        planID: number,
        semesterID: number,
        semesterCourses: Course[]
    ) => void;
}): JSX.Element {
    const [isEditing, setEditing] = useState<boolean>(false);

    function openEdit(): void {
        setEditing(!isEditing);
    }

    /*
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

    function setRequirements(newReqs: Course[]): void {
        setRequiredCourses(newReqs);
    }

    function setFloats(newFloats: Course[]): void {
        setFloatingCourses(newFloats);
    }
    */

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
                                            planSemesters={plan.semesters}
                                            courses={courses}
                                            floatingCourses={courses.filter(
                                                (course: Course): boolean =>
                                                    plan.floating_courses.includes(
                                                        course.id
                                                    )
                                            )}
                                            requiredCourses={courses.filter(
                                                (course: Course): boolean =>
                                                    plan.requirements.includes(
                                                        course.id
                                                    )
                                            )}
                                            takenCourses={courses.filter(
                                                (course: Course): boolean =>
                                                    plan.taken_courses.includes(
                                                        course.id
                                                    )
                                            )}
                                            planID={plan.id}
                                            addSemester={addSemester}
                                            removeSemester={removeSemester}
                                            setSemesterName={setSemesterName}
                                            setFloatingCourses={
                                                setFloatingCourses
                                            }
                                            setRequiredCourses={
                                                setRequiredCourses
                                            }
                                            setTakenCourses={setTakenCourses}
                                            setSemesterCourses={
                                                setSemesterCourses
                                            }
                                            updateCourses={updateCourses}
                                        ></ListSemesters>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <ClearSemesterModal
                            clearSemesters={clearSemesters}
                            planID={plan.id}
                        ></ClearSemesterModal>
                    </Col>
                    <Col sm={3}>
                        <div>
                            <span data-testid="floating-text">
                                Floating Courses:
                            </span>
                            <ViewFloatingCourses
                                floatingCourses={courses.filter(
                                    (course: Course): boolean =>
                                        plan.floating_courses.includes(
                                            course.id
                                        )
                                )}
                                takenCourses={courses.filter(
                                    (course: Course): boolean =>
                                        plan.taken_courses.includes(course.id)
                                )}
                                setFloatingCourses={setFloatingCourses}
                                setTakenCourses={setTakenCourses}
                                setSemesterCourses={setSemesterCourses}
                                semesters={plan.semesters}
                                courses={courses}
                                planID={plan.id}
                            ></ViewFloatingCourses>
                            <span data-testid="required-text">
                                Required Courses:
                            </span>
                            <ViewRequirements
                                requirements={courses.filter(
                                    (course: Course): boolean =>
                                        plan.requirements.includes(course.id)
                                )}
                                takenCourses={courses.filter(
                                    (course: Course): boolean =>
                                        plan.taken_courses.includes(course.id)
                                )}
                            ></ViewRequirements>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
