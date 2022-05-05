import React, { useState } from "react";
import { Col, Row /*, Button, Offcanvas , Table*/ } from "react-bootstrap";

export function GreetingMessage(): JSX.Element {
    return (
        <div>
            <div className="welcome">
                Welcome to our college planner! Feel free to dive on in!
            </div>
            <div>
                Or, if you are having trouble, here are some common questions
                and answers:
            </div>
            <div></div>
        </div>
    );
}
