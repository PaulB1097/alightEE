import "./App.css";

import { Home } from "./components/Home";
import Department from "./components/Department";
import Employee from "./components/Employee";
import { Navigation } from "./components/Navigation";

import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h2 className="m-5 d-flex justify-content-center">
          {" "}
          Alight.EE internship project
        </h2>

        <Navigation />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/department" component={Department} />
          <Route path="/employee" component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
