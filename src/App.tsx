import React, { useState } from "react";
import "./App.css";
import { ListPlans } from "./components/listPlans";
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
                UD CISC275 with React Hooks and TypeScript
            </header>
            <div>Jingqing Liu add name here!</div>
            <div>I&apos;m Weldin Dunn, and I approve this message.</div>
            <div>Zhiwen Zhu add name to final</div>

            <div style={{ textAlign: "center" }}>
                <ListPlans degreePlans={plans}></ListPlans>
            </div>
        </div>
    );
}

export default App;
