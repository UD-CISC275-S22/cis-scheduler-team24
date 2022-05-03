import React, { useState } from "react";
import { Container, Button, Table, Stack, Row, Col } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListSemesters } from "./listSemesters";
import { EditPlan } from "./editPlan";
import { ViewFloatingCourses } from "./viewFloatingCourses";
import { ViewRequirements } from "./viewRequirements";
import courses from "../data/course–book.json";
import { ClearSemesterModal } from "./ClearSemesterModal";

const COURSES = courses.map(
    (course): Course => ({
        ...course,
        prerequisites: course.prerequisites.map(Number)
    })
);

export function ViewPlan({
    plan,
    setPlanName
}: {
    plan: Plan;
    setPlanName: (id: number, name: string) => void;
}): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [semesters, setSemesters] = useState<Semester[]>(plan.semesters);
    const [isEditing, setEditing] = useState<boolean>(false);

    const [floatingCourses, setFloatingCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean => !course.isTaken)
    );
    const [requiredCourses, setRequiredCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean => course.isRequired)
    );

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

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
                (course: Course): Course => ({ ...course, isTaken: false })
            )
        );
        setRequirements(
            requiredCourses.map(
                (course: Course): Course => ({ ...course, isTaken: false })
            )
        );
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
                                            addSemester={addSemester}
                                            removeSemester={removeSemester}
                                            setSemesterName={setSemesterName}
                                            setFloats={setFloats}
                                            setRequirements={setRequirements}
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
                            {/* <Button variant="primary" onClick={handleShow}>
                                    Show Courses Pool and Degree plan
                                </Button>

                                <Offcanvas
                                    show={show}
                                    onHide={handleClose}
                                    placement={"end"}
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>
                                            Degree Plan
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body> */}
                            Floating Courses:
                            <ViewFloatingCourses
                                floatingCourses={floatingCourses}
                                setFloats={setFloats}
                            ></ViewFloatingCourses>
                            Required Courses:
                            <ViewRequirements
                                requirements={requiredCourses}
                            ></ViewRequirements>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
