import React from "react";
import "./App.css";
import { Tables } from "./components/showtable";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <div>Jingqing Liu add name here!</div>
            <div>I&apos;m Weldin Dunn, and I approve this message.</div>
            <div>Zhiwen Zhu add name to final</div>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
            <div style={{ textAlign: "center" }}>
                <Tables></Tables>
            </div>
        </div>
    );
}

export default App;
