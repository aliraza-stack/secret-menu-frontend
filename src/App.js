import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import EditPage from "./pages/EditMenu/EditMenu";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/edit/:id" component={EditPage} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
