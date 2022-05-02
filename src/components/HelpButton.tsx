import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

export function HelpButton() {
    return (
        <OverlayTrigger
            placement="left"
            overlay={
                <Popover id="popover-basic">
                    <Popover.Header as="h3">
                        Application Introduction
                    </Popover.Header>
                    <Popover.Body>
                        Still need detail here. If you need help, contact
                        jinging@udel.edu. ^^
                    </Popover.Body>
                </Popover>
            }
        >
            {({ ref, ...triggerHandler }) => (
                <Button
                    variant="white"
                    {...triggerHandler}
                    className="button-style-4 "
                    ref={ref}
                >
                    ❓
                </Button>
            )}
        </OverlayTrigger>
    );
}
