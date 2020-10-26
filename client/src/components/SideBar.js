import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], selected: "", newCategory: "" };
  }

  async componentDidMount() {
    try {
      // fetch categories
      const categories = await api.getCategories();
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  // Nav methods

  handleClick = (category_id) => {
    this.setState({ selected: category_id });
  };

  handleReset = () => {
    this.setState({ selected: 0 });
  };

  // Form methods

  handleInput = (e) => {
    this.setState({ newCategory: e.target.value });
  };

  addCategory = async (e) => {
    e.preventDefault();

    try {
      // Add new category to database
      await api.addCategory(this.state.newCategory);
      // Fetch categories again to reflect changes in sidebar
      const categories = await api.getCategories();
      this.setState({ categories, newCategory: "" });
    } catch (error) {
      console.log(error);
    }
  };

  deleteCategory = async (category_id) => {
    try {
      await api.deleteCategory(category_id);
      // Fetch categories again to reflect changes in sidebar
      const categories = await api.getCategories();
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }

    // navigate back to home page
    if (this.props.history) this.props.history.push("/");
  };

  render() {
    const { categories, selected, newCategory } = this.state;
    return (
      <div className="">
        <nav className="nav flex-column mt-5">
          <Link
            className="navbar-text ml-3 text-secondary font-weight-bold"
            onClick={this.handleReset}
            to="/"
          >
            Categories
          </Link>
          {categories.map((category, i) => (
            <div key={i} className="d-flex justify-content-between">
              <Link
                className={
                  selected === category.id
                    ? "active nav-link text-dark"
                    : "nav-link text-dark"
                }
                onClick={() => this.handleClick(category.id)}
                to={`/${category.id}`}
              >
                {category.name}
              </Link>
              <a
                className="nav-link dropdown-toggle px-0 text-secondary"
                href="#"
                id="navbarDropdown"
                data-toggle="dropdown"
              >
                <i className="fas fa-ellipsis-h p-0 m-0"></i>
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Rename
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.deleteCategory(category.id)}
                >
                  Delete
                </a>
              </div>
            </div>
          ))}
          <form className="form-inline mt-3">
            <input
              className="form-control w-75"
              name="category"
              value={newCategory}
              onChange={this.handleInput}
              placeholder="Category..."
            />
            <button
              className="btn btn-outline-dark px-2 ml-1"
              onClick={this.addCategory}
            >
              Add
            </button>
          </form>
        </nav>
      </div>
    );
  }
}
