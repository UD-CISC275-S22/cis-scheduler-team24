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

export function ViewRequirements({
    requirements
}: {
    requirements: Course[];
}): JSX.Element {
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
        </div>
    );
}
