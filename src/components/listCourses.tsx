import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { EditCourseModal } from "./EditCourseModal";
//import { ViewCourse } from "./viewCourse";

interface Courses {
    semesterCourses: Course[];
}

export function ListCourses({ semesterCourses }: Courses): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(semesterCourses);
    const [showAddModal, setShowAddModal] = useState(false);
    showAddModal;

    const Credits = courses.reduce(
        (currentTotal: number, course: Course) => currentTotal + course.credits,
        0
    );

    function editCourse(id: number, newCourse: Course) {
        setCourses(
            courses.map(
                (course: Course): Course =>
                    course.id === id ? newCourse : course
            )
        );
    }

    const handleCloseAddModal = () => setShowAddModal(false);

    function deleteCourse(id: number) {
        setCourses(
            courses.filter((course: Course): boolean => course.id !== id)
        );
        setShowAddModal(false);
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>CourseID</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                        <th>Course Credit</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course: Course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.credits}</td>
                            <td>
                                <EditCourseModal
                                    handleClose={handleCloseAddModal}
                                    course={course}
                                    editCourse={editCourse}
                                    deletCourse={deleteCourse}
                                ></EditCourseModal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Container>
                <div>Total Credits: {Credits}</div>
            </Container>
        </div>
    );
}
