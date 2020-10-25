import React from "react";
import "./App.css";
import AddCourse from "./components/AddCourse";
import CoursePage from "./components/CoursePage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SideBar from "./components/SideBar";
import CategoryPage from "./components/CategoryPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div className="container-fluid">
          <div className="row vh-100">
            <div className="col-2 border-right ">
              <SideBar />
            </div>
            <div className="col-10 text-center pl-5">
              <Switch>
                <Route path="/addcourse">
                  <AddCourse />
                </Route>
                <Route path="/courses/:id" component={CoursePage} />

                <Route path="/:categoryId" component={CategoryPage} />

                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
