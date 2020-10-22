import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import "./CourseCard.css";

export default class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  // can I get tasks from the course page?
  async getProgress() {
    const { id } = this.props.course;

    // // get and store tasks
    // const res = await fetch(`/courses/${id}/tasks`);
    // const tasks = await res.json();

    const tasks = await api.getTasks(id);

    const completedTasks = tasks.filter((task) => task.complete === 1);

    // calculate progress based on completed tasks
    const progress = (completedTasks.length / tasks.length) * 100;

    this.setState({ progress });
  }

  componentDidMount() {
    this.getProgress();
  }

  render() {
    const { course, category } = this.props;
    const { progress } = this.state;

    return (
      <div className="card m-4 position-relative">
        <div className="card-body pt-3 text-left">
          <small className="card-subtitle text-muted mb-3">
            {category?.name}
          </small>
          <Link to={`/courses/${course.id}`}>
            <h5 className="card-title">{course?.title}</h5>
          </Link>
          <h6 className="card-subtitle text-capitalize text-muted">
            {course.platform}
          </h6>

          <div className="footer text-right position-absolute ">
            <a href={course?.url} target="_blank" className="card-link">
              Go to course<i className="fas fa-external-link-alt mx-2 mb-2"></i>
            </a>

            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
