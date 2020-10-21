import React, { Component } from "react";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      platform: "",
      collection: undefined,
      collections: [],
    };
  }

  getCollections = () => {
    fetch(`/collections`)
      .then((res) => res.json())
      .then((data) => this.setState({ collections: data }))
      .catch((error) => console.log(error));
  };

  handleInput = (e) => {
    // Handle input from select
    const { name, value } = e.target;

    // If a url is given, handle parsing to prefill title and platform
    if (name === "url" && value) {
      const parsedUrl = value.split("/");

      console.log(parsedUrl);

      // Get last part of url that contains the course title (before last if url ends with /)
      const titleFromUrl = parsedUrl[parsedUrl.length - 1]
        ? parsedUrl[parsedUrl.length - 1]
        : parsedUrl[parsedUrl.length - 2];

      console.log(titleFromUrl);

      // Format title
      const title = titleFromUrl
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");

      // Get part that contains name of platform
      const platformFromUrl = parsedUrl
        .find((e) => e.slice(0, 3) === "www")
        .split(".")[1];

      // Format platform name
      const platform =
        platformFromUrl[0].toUpperCase() + platformFromUrl.slice(1);

      this.setState({ url: value, title, platform });

      // If url is removed, remove the title
    } else if (name === "url" && !value) {
      this.setState({ title: "" });
    }

    this.setState({ [name]: value });
  };

  addCourse = (e) => {
    e.preventDefault();

    const newCourse = {
      title: this.state.title,
      url: this.state.url,
      collection: this.state.collection,
    };

    fetch(`/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then(() => console.log("Course added"))
      .catch((err) => console.log(err));
  };

  render() {
    const { collections } = this.state;
    return (
      <div className="d-inline-block w-75 mt-5">
        <h2>Add a new course</h2>
        <form className="my-3">
          <input
            className="form-control mb-2"
            name="url"
            value={this.state.url}
            onChange={this.handleInput}
            placeholder="Course url"
          />
          <input
            className="form-control"
            name="title"
            value={this.state.title}
            onChange={this.handleInput}
            placeholder="Course title"
          />
          <div className="form-row mt-2">
            <div className="col-7">
              <input
                className="form-control"
                name="platform"
                value={this.state.platform}
                onChange={this.handleInput}
                placeholder="Platform"
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                id="collection"
                name="collection"
                value={this.state.collection}
                onChange={this.handleInput}
              >
                <option>Choose collection</option>
                {collections.map((collection, i) => (
                  <option key={i}>{collection.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="btn btn-outline-dark mt-2"
            onClick={this.addCourse}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
