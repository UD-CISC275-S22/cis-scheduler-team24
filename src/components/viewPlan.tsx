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
    setPlanName,
    addSemester,
    removeSemester,
    removeSemesterCourses,
    clearSemesters,
    removeCourse,
    addCourse,
    editCourse,
    setSemesterName,
    skipSemester,
    unskipSemester,
    moveFromFloatingCourses
}: {
    courses: Course[];
    plan: Plan;
    setPlanName: (id: number, name: string) => void;
    addSemester: (planID: number) => void;
    removeSemester: (planID: number, semester: Semester) => void;
    removeSemesterCourses: (planID: number, semester: Semester) => void;
    clearSemesters: (planID: number) => void;
    removeCourse: (planID: number, semesterID: number, course: Course) => void;
    addCourse: (planID: number, semesterID: number, course: Course) => void;
    editCourse: (
        planID: number,
        semesterID: number,
        isRequired: boolean,
        course: Course
    ) => void;
    setSemesterName: (
        planID: number,
        semesterID: number,
        semesterName: string
    ) => void;
    skipSemester: (planID: number, semester: Semester) => void;
    unskipSemester: (planID: number, semester: Semester) => void;
    moveFromFloatingCourses: (
        planID: number,
        semester: Semester,
        course: Course,
        floatingCourses: Course[],
        takenCourses: Course[]
    ) => void;
}): JSX.Element {
    const [isEditing, setEditing] = useState<boolean>(false);

    function openEdit(): void {
        setEditing(!isEditing);
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
                                            removeSemesterCourses={
                                                removeSemesterCourses
                                            }
                                            removeCourse={removeCourse}
                                            addCourse={addCourse}
                                            editCourse={editCourse}
                                            setSemesterName={setSemesterName}
                                            skipSemester={skipSemester}
                                            unskipSemester={unskipSemester}
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
                                moveFromFloatingCourses={
                                    moveFromFloatingCourses
                                }
                                semesters={plan.semesters}
                                planID={plan.id}
                            ></ViewFloatingCourses>
                            <span data-testid="required-text">
                                Required Courses:
                            </span>
                            <ViewRequirements
                                requiredCourses={courses.filter(
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
