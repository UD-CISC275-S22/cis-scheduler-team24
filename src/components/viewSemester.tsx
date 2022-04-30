import React from "react";
import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";
import { EditSemester } from "./editSemester";

export function ViewSemester({
    semester,
    courses,
    floatingCourses,
    requiredCourses,
    removeSemester,
    setSemesterName,
    setFloats,
    setRequirements,
    updateCourses
}: {
    semester: Semester;
    courses: Course[];
    floatingCourses: Course[];
    requiredCourses: Course[];
    removeSemester: (id: number) => void;
    setSemesterName: (id: number, name: string) => void;
    setFloats: (courses: Course[]) => void;
    setRequirements: (courses: Course[]) => void;
    updateCourses: (newCourse: Course) => void;
}): JSX.Element {
    const [semesterCourses, setSemesterCourses] = useState<Course[]>(
        courses.filter((course: Course): boolean =>
            semester.courses.includes(course.id)
        )
    );
    const [isEditing, setEditing] = useState<boolean>(false);

    function deleteSemester(): void {
        removeSemester(semester.id);
        removeCourses();
    }

    function removeCourses(): void {
        setFloats([...floatingCourses, ...semesterCourses]);
        setSemesterCourses([]);
    }

    function openEdit(): void {
        setEditing(!isEditing);
    }

    function updateSemesterCourses(newCourse: Course): void {
        setSemesterCourses([...semesterCourses, newCourse]);
    }

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>
                                <span>
                                    {isEditing ? (
                                        <EditSemester
                                            semester={semester}
                                            setSemesterName={setSemesterName}
                                            openEdit={openEdit}
                                        ></EditSemester>
                                    ) : (
                                        <div>
                                            {semester.name}
                                            <Button
                                                onClick={openEdit}
                                                variant="empty"
                                                className="me-8"
                                            >
                                                🖊
                                            </Button>
                                        </div>
                                    )}
                                </span>
                            </th>
                            <th>
                                <Button onClick={deleteSemester}>
                                    Remove Semester
                                </Button>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <ListCourses
                                    semesterCourses={semesterCourses}
                                    floatingCourses={floatingCourses}
                                    requiredCourses={requiredCourses}
                                    setFloats={setFloats}
                                    setRequirements={setRequirements}
                                    removeSemesterCourses={removeCourses}
                                    updateCourses={updateCourses}
                                    updateSemesterCourses={
                                        updateSemesterCourses
                                    }
                                ></ListCourses>
                            </th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
