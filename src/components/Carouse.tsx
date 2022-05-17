import React from "react";
import { Carousel } from "react-bootstrap";

export function Carouse() {
    return (
        <Carousel>
            <Carousel.Item interval={2000}>
                <header className="App-header">
                    <div>UD CIS Scheduler</div>
                </header>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <header className="App-header">
                    <div>
                        Team 24 College Planner by Weldin, Zhiwen, and Jingqing
                    </div>
                </header>
            </Carousel.Item>
        </Carousel>
    );
}
