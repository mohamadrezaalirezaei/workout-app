const express = require("express");

const Workouts = require("../models/workoutModel");

const {
  createWorkout,
  getAllWorkouts,
  getWorkoutByID,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");
const protect = require("../middleware/protect");

const router = express.Router();
router.use(protect);

router.get("/", getAllWorkouts);

router.get("/:id", getWorkoutByID);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
