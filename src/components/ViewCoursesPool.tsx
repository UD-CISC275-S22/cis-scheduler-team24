import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle
} from "react-beautiful-dnd";

export function ViewCoursesPool({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [courses] = useState<Course[]>(semester.courses);
    const onDragEnd = (result: DropResult) => {
        const [newcourses, setnewcourses] = useState<Course[]>(courses);
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(newcourses);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);
        setnewcourses(items);
    };

    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined
    ) => ({
        padding: 10,
        margin: "0 50px 15px 50px",
        background: isDragging ? "#4a2975" : "white",
        color: isDragging ? "white" : "black",
        border: "1px solid black",
        frontsize: "20px",
        borderRadius: "5px",
        ...draggableStyle
    });
    return (
        <Container>
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
                                                // style={{
                                                //     border: "1px solid #242424",
                                                //     opacity: 0.5,
                                                //     borderRadius: "5px"
                                                // }}
                                                key={index}
                                            >
                                                {course.name}
                                                {"                        "}
                                                {"       Credit: "}
                                                {course.credits}
                                            </div>
                                        )}
                                    </Draggable>
                                );
                                {
                                    Provided.placeholder;
                                }
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {/* <DragDropContext onDragEnd={onDragEnd}>
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
                                        provided.draggableProps.style
                                    )}
                                    key={index}
                                >
                                    {course.id}
                                    {course.name}
                                    {course.description}
                                    {course.credits}
                                </div>
                            )}
                        </Draggable>
                    );
                })}
            </DragDropContext> */}
            {/* {courses.map((course: Course) => (
                <div key={semester.id}>
                    <Table>
                        <thead>
                            <tr>
                                <th>{course.id}</th>
                                <th>{course.name}</th>
                                <th>{course.description}</th>
                                <th>{course.credits}</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            ))} */}
        </Container>
    );
}