import React, { useState } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { EditCourseModal } from "./EditCourseModal";
import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle
} from "react-beautiful-dnd";
//import { ViewCourse } from "./viewCourse";

interface Courses {
    semesterCourses: Course[];
}

export function ListCourses({ semesterCourses }: Courses): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(semesterCourses);
    const [showAddModal, setShowAddModal] = useState(false);
    showAddModal;
    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<string>("");
    const [prereqs, setPrereqs] = useState<string>("");

    const handleCloseAddModal = () => setShowAddModal(false);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(courses);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);
        setCourses(items);
    };

    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined
    ) => ({
        padding: 10,
        margin: "0 10px 15px 10px",
        background: isDragging ? "green" : "white",
        color: isDragging ? "white" : "black",
        border: "1px solid black",
        frontsize: "20px",
        borderRadius: "5px",
        ...draggableStyle
    });

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

    function deleteCourse(id: number) {
        setCourses(
            courses.filter((course: Course): boolean => course.id !== id)
        );
        setShowAddModal(false);
    }

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
            prerequisites: prereqs.split(", ").map(Number),
            isTaken: false,
            isEditing: false,
            isRequired: false,
            breadthType: ""
        });
        setId("");
        setName("");
        setDescription("");
        setCredits("");
        setPrereqs("");
    }

    function deleteAllCourse() {
        setCourses([]);
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                        <th>Course Credit</th>
                        <th>Course Prerequisites (ID)</th>
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
                            <td>{course.prerequisites.map(String)}</td>
                            <td>
                                <EditCourseModal
                                    handleClose={handleCloseAddModal}
                                    course={course}
                                    editCourse={editCourse}
                                    deleteCourse={deleteCourse}
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
                                placeholder="Enter Course ID*"
                            />
                        </td>
                        <td>
                            <Form.Control
                                value={name}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setName(event.target.value)}
                                placeholder="Enter Name"
                            />
                        </td>
                        <td>
                            <Form.Control
                                value={description}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setDescription(event.target.value)}
                                placeholder="Enter Description"
                            />
                        </td>
                        <td>
                            <Form.Control
                                value={credits}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCredits(event.target.value)}
                                placeholder="Enter Credits"
                            />
                        </td>
                        <td>
                            <Form.Control
                                value={prereqs}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setPrereqs(event.target.value)}
                                placeholder="Enter Prerequisites"
                            />
                        </td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={saveAddChange}
                                className="button-style-2"
                                disabled={!id || !credits}
                            >
                                Add Course
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Container>
                <DeleteCourseModal
                    deletCourse={() => {
                        deleteAllCourse();
                    }}
                ></DeleteCourseModal>
            </Container>
            <Container>
                <div>Total Credits: {Credits}</div>
            </Container>
            <div className="coursesbox">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="courses">
                        {(Provided) => (
                            <div
                                className="courses"
                                {...Provided.droppableProps}
                                ref={Provided.innerRef}
                            >
                                {courses.map((course, index) => {
                                    return (
                                        <Draggable
                                            key={course.id}
                                            draggableId={course.id.toString()}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps
                                                            .style
                                                    )}
                                                    key={index}
                                                >
                                                    {course.name}
                                                    {"                        "}
                                                    {"       Credit:  "}
                                                    {course.credits}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {Provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}
