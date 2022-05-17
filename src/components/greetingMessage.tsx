import React from "react";
import { Accordion } from "react-bootstrap";

export function GreetingMessage(): JSX.Element {
    return (
        <div>
            <div className="welcome">
                Welcome to our college planner! Feel free to dive on in!
            </div>
            <div className="help">
                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="Index">
                        <Accordion.Header>
                            Or, if you are having trouble, here are some common
                            questions and answers:
                        </Accordion.Header>
                        <Accordion.Body>
                            <Accordion alwaysOpen>
                                <Accordion.Item eventKey="Plans">
                                    <Accordion.Header>Plans</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion.Item eventKey="p1">
                                            <Accordion.Header>
                                                Where are my different plans?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Your plans can be accessed
                                                through the navigation bar
                                                below.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="p2">
                                            <Accordion.Header>
                                                How can I add and delete plans?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                You can add plans by pressing
                                                the &quot;Add Plan&quot; button
                                                to the right of your other
                                                plans. This will create a blank
                                                plan. You can delete a plan by
                                                pressing the X to the right of
                                                its name.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="p3">
                                            <Accordion.Header>
                                                How can I edit my plan&apos;s
                                                name?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                You can edit a plan&apos;s name
                                                by pressing the pen button next
                                                to its name.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="p4">
                                            <Accordion.Header>
                                                How can download my plans and
                                                courses?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                You can download your plans and
                                                courses by scrolling to the
                                                bottom of the page and using the
                                                &quot;Download all plans&quot;
                                                and &quot;Download all
                                                courses&quot; buttons.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Accordion alwaysOpen>
                                <Accordion.Item eventKey="Semesters">
                                    <Accordion.Header>
                                        Semesters
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion.Item eventKey="s1">
                                            <Accordion.Header>
                                                Where are my semesters?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Each semester is listed below
                                                the plan navigation bar. By
                                                default, a semester&apos;s name
                                                is its year and the season in
                                                which it is taken.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="s2">
                                            <Accordion.Header>
                                                How can I change a
                                                semester&apos;s name?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                You can edit a semester&apos;s
                                                name by pressing the pen button
                                                next to its name.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="s3">
                                            <Accordion.Header>
                                                How can I delete a semester?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                You can delete a semester by
                                                pressing the X next to its name.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="s4">
                                            <Accordion.Header>
                                                How can I add a semester?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                You can add a semester by
                                                pressing the &quot;Add
                                                Semester&quot; button below all
                                                other semesters. &#40;You may
                                                want to toggle all semesters
                                                instead of scrolling all the way
                                                down!&#41;
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="s5">
                                            <Accordion.Header>
                                                How can I delete all semesters?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                You can delete all semesters by
                                                pressing the &quot;Clear
                                                Semesters&quot; button below all
                                                other semesters. &#40;You may
                                                want to toggle all semesters
                                                instead of scrolling all the way
                                                down!&#41;
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="s6">
                                            <Accordion.Header>
                                                What does the skip button do?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                The skip button makes the
                                                semester act as though the
                                                courses in that semester are not
                                                being taken. This moves the
                                                courses to the floating pool and
                                                removes their &quot;taken&quot;
                                                status from the required table
                                                without deleting them from the
                                                semester. To have the courses
                                                show up again, uncheck the skip
                                                box.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Accordion alwaysOpen>
                                <Accordion.Item eventKey="Courses">
                                    <Accordion.Header>Courses</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion.Item eventKey="c1">
                                            <Accordion.Header>
                                                Where are my different courses?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                The courses currently being
                                                taken in each semester is listed
                                                under a table. The table lists
                                                the course&apos;s name,
                                                description, number of credits,
                                                and prerequisites.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="c2">
                                            <Accordion.Header>
                                                What are &quot;Floating
                                                Courses&quot;?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Floating courses are courses
                                                that have been added but are not
                                                currently a part of any
                                                semester. They only display the
                                                course name and number of
                                                credits.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="c3">
                                            <Accordion.Header>
                                                What are &quot;Required
                                                Courses&quot;?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Required Courses are courses one
                                                must take in order to complete
                                                their degree. They are listed in
                                                a table on the right side of the
                                                screen and display both the
                                                course name and whether or not
                                                it is currently a part of any
                                                semester in the current plan.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="c4">
                                            <Accordion.Header>
                                                How can I edit a course?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                To edit a course, you can use
                                                the &quot;Edit&quot; button in
                                                the courses table. Here, you can
                                                find the course&apos;s name,
                                                description, number of credits,
                                                and prerequisites. You can also
                                                set the course as a degree
                                                requirement. You can also delete
                                                the course with the
                                                &quot;Delete&quot; button. This
                                                will move the course to the
                                                &quot;Floating Courses&quot;
                                                pool.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="c5">
                                            <Accordion.Header>
                                                How can I delete a course?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                To delete a course, you can
                                                press the X next to the
                                                &quot;Edit&quot; button in each
                                                course. You can also delete a
                                                course through its edit modal.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="c6">
                                            <Accordion.Header>
                                                How can I delete all courses?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                To delete all courses, press the
                                                &quot;Delete All Courses&quot;
                                                button below the course table.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="c7">
                                            <Accordion.Header>
                                                How can I add a new course?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                To add a new course, you can
                                                type in a course name,
                                                description, number of credits,
                                                and prerequisites below the
                                                other courses in the course
                                                table. In order for a course to
                                                be added, it must be given a
                                                name and number of credits. Be
                                                sure to format your course name
                                                like &quot;CODE###: Title&quot;.
                                                &#40;Ex. ACCT207: Introduction
                                                to Accounting&#41;
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}
