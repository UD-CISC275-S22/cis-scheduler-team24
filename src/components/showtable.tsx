import React from "react";
import Table from "react-bootstrap/Table";

export function Tables(): JSX.Element {
    return (
        <div>
            <Table striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th colSpan={4}>First Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>FALL</td>
                        <td>WINTER</td>
                        <td>SPRING</td>
                        <td>SUMMER</td>
                    </tr>
                    <tr>
                        <td>
                            <Table striped borderless hover size="md">
                                <thead>
                                    <tr>
                                        <th>COURSE</th>
                                        <th>DESCRIPTION</th>
                                        <th>CREDITS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>EGGG 101</td>
                                        <td>
                                            Introduction to Engineering(EYE)
                                        </td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>CISC 108</td>
                                        <td>
                                            Introduction to Computer Science I
                                        </td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>MATH 241</td>
                                        <td>Analytic Geometry and Calculs A</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td>ENGL 110</td>
                                        <td>Seminar in composition</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>HIST 141</td>
                                        <td>Breadth Requirement</td>
                                        <td>3</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
