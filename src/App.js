import React from "react";
import "./assets/scss/App.scss";
import CalculatorOld from "./components/CalculatorOld";
import {BrowserRouter, Route} from "react-router-dom";
import {Calculator} from "./components/Calculator/Calculator";

const App = () => (
    <BrowserRouter>
        <Route exact path={process.env.PUBLIC_URL + '/'} render={() => <CalculatorOld/>}/>
        <Route exact path={process.env.PUBLIC_URL + '/calculator'} render={() => <Calculator/>}/>
    </BrowserRouter>
);

export default App;