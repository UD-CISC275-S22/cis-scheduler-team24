import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
/*
import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle
} from "react-beautiful-dnd";
*/

export function ViewRequirements({
    requirements,
    setRequirements
}: {
    requirements: Course[];
    setRequirements: (courses: Course[]) => void;
}): JSX.Element {
    /*
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(requirements);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);
        setRequirements(items);
    };
    */

    /*
    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined
    ) => ({
        padding: "3px",
        margin: "3px -5px 10px -5px",
        background: isDragging ? "#4a2975" : "white",
        color: isDragging ? "white" : "black",
        border: "1px solid black",
        frontsize: "20px",
        borderRadius: "5px",
        ...draggableStyle
    });
    */

    return (
        <div>
            <Table striped bordered hover className="required">
                <thead>
                    <tr>
                        <th>
                            <div>Course</div>
                        </th>
                        <th>
                            <div>Taken?</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {requirements.map((course: Course) => (
                        <tr key={course.id}>
                            <td>
                                <td>{course.name}</td>
                            </td>
                            <td>
                                {course.isTaken ? <div>✓</div> : <div>✗</div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/*}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="courses">
                    {(Provided) => (
                        <div
                            className="courses"
                            {...Provided.droppableProps}
                            ref={Provided.innerRef}
                        >
                            {requirements.map((course, index) => {
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
                        */}
        </div>
    );
}
