import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

export function HelpButton() {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Application Introduction</Popover.Header>
            <Popover.Body>
                Still need detail here. If you need help, connect
                jinging@udel.edu. ^^
            </Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="empty" className="me-8">
                ❓
            </Button>
        </OverlayTrigger>
    );
}
