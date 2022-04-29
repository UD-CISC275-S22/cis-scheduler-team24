import React from "react";
import { Course } from "../interfaces/course";

import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle
} from "react-beautiful-dnd";

export function ViewFloatingCourses({
    floatingCourses,
    setFloats
}: {
    floatingCourses: Course[];
    setFloats: (newFloats: Course[]) => void;
}): JSX.Element {
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(floatingCourses);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);
        setFloats(items);
    };

    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined
    ) => ({
        padding: 8,
        margin: "0 1px 10px 1px",
        background: isDragging ? "#4a2975" : "white",
        color: isDragging ? "white" : "black",
        border: "1px solid black",
        frontsize: "20px",
        borderRadius: "5px",
        ...draggableStyle
    });
    return (
        <div className="floating">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="courses">
                    {(Provided) => (
                        <div
                            className="courses"
                            {...Provided.droppableProps}
                            ref={Provided.innerRef}
                        >
                            {floatingCourses.map((course, index) => {
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
                                                {"Credit: "}
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
        </div>
    );
}
