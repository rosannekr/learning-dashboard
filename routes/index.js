var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* Collections */

// GET list of collections
router.get("/", function (req, res, next) {
  db("SELECT * FROM collections;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new collection
router.post("/", function (req, res, next) {
  db(`INSERT INTO collections (name) VALUES ("${req.body.name}");`)
    .then(() => {
      res.send("New collection added");
    })
    .catch((err) => res.status(500).send(err));
});

/* Courses */

// GET list of courses
router.get("/courses", function (req, res, next) {
  db("SELECT * FROM courses;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new course
router.post("/courses", function (req, res, next) {
  const { title, url, collection } = req.body;

  db(
    `INSERT INTO courses (title, url, collection_id) VALUES ("${title}", "${url}", ${collection});`
  )
    .then(() => {
      res.send("New course added");
    })
    .catch((err) => res.status(500).send(err));
});

// PUT to update course
router.put("/courses/:id", function (req, res, next) {
  db(`UPDATE courses SET complete = 1 WHERE id = ${req.params.id};`)
    .then(() => {
      res.send("Course completed");
    })
    .catch((err) => res.status(500).send(err));
});

/* Tasks */

// GET list of tasks for one course
router.get("/courses/:id", function (req, res, next) {
  db(`SELECT * FROM tasks WHERE course_id = ${req.params.id};`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new task
router.post("/courses/:id", function (req, res, next) {
  db(
    `INSERT INTO tasks (name, course_id) VALUES ("${req.body.name}", ${req.params.id});`
  )
    .then(() => {
      res.send("New task added");
    })
    .catch((err) => res.status(500).send(err));
});

// PUT to update task
router.put("/tasks/:id", function (req, res, next) {
  db(`UPDATE tasks SET complete = 1 WHERE id = ${req.params.id};`)
    .then(() => {
      res.send("Task completed");
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
