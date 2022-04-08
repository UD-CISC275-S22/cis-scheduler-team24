import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./App.css";
import { ViewPlan } from "./components/viewPlan";
import { Plan } from "./interfaces/plan";
import plans from "./data/plans.json";

const PLANS = plans.map(
    (plan): Plan => ({
        ...plan
    })
);

function App(): JSX.Element {
    const [plans] = useState<Plan[]>(PLANS);

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Team 24 College Planner by Weldin, Zhiwen, and Jingqing
                </div>
            </header>

            <div>
                <Tabs defaultActiveKey={plans[0].id}>
                    {plans.map((plan: Plan) => (
                        <Tab key={plan.id} eventKey={plan.id} title={plan.name}>
                            <ViewPlan plan={plan}></ViewPlan>
                        </Tab>
                    ))}
                    <Tab title={"Add Plan"}></Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default App;
