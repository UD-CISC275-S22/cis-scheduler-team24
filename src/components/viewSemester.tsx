import React from "react";
import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { ListCourses } from "./listCourses";

export function ViewSemester({
    semester,
    removeSemester
}: {
    semester: Semester;
    removeSemester: (id: number) => void;
}): JSX.Element {
    const [courses /*, setcourses*/] = useState<Course[]>(semester.courses);
    const [semesterName /*, setSemesterName*/] = useState<string>(
        semester.session + ", " + semester.year
    );
    const [showMore, setShowMore] = useState<boolean>(true);

    function deleteSemester(): void {
        removeSemester(semester.id);
    }

    return (
        <div>
            <Container>
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>{semesterName}</th>
                            <th>
                                <Button
                                    className="btn"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? "Hide" : "show more"}
                                </Button>
                                <Button onClick={deleteSemester}>
                                    Remove Semester
                                </Button>
                            </th>
                        </tr>
                        <tr>
                            {showMore ? (
                                <th>
                                    <ListCourses
                                        semesterCourses={courses}
                                    ></ListCourses>
                                </th>
                            ) : (
                                <th> </th>
                            )}
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    );
}
