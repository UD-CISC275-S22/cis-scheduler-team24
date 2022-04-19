import React, { useState } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
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

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<string>("");

    function addMovie(newCourse: Course) {
        const existing = courses.find(
            (course: Course): boolean => course.id === newCourse.id
        );
        if (existing === undefined) {
            setCourses([...courses, newCourse]);
        }
    }

    function saveAddChange() {
        addMovie({
            id: parseInt(id),
            name: name,
            credits: parseInt(credits),
            description: description,
            prerequisites: [],
            isTaken: false,
            isEditing: false,
            breadthType: ""
        });
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
                    <tr key="CourseInput">
                        <td>
                            <Form.Control
                                value={id}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setId(event.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                value={name}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setName(event.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                value={description}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setDescription(event.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                value={credits}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCredits(event.target.value)}
                            />
                        </td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={saveAddChange}
                                className="button-style-2"
                            >
                                Add Course
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Container>
                <div>Total Credits: {Credits}</div>
            </Container>
        </div>
    );
}
