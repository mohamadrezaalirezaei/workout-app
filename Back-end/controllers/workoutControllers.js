const Workouts = require("../models/workoutModel");
const mongoose = require("mongoose");

// create workouts

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: `please enter ${emptyFields}`, emptyFields });
  }

  try {
    const user_id = req.user._id;

    const workout = await Workouts.create({ title, reps, load, user_id });
    res.status(200);
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all workouts

const getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workouts.find({ user_id });
    res.status(200).json(workouts);
  } catch (error) {
    console.log(error.message);
  }
};

//get a single one

const getWorkoutByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "id is invalid!",
    });
  }

  const workout = await Workouts.findById(id);

  if (!workout) {
    return res.status(404).json({ messag: " workout not found " });
  }

  res.status(200).json({
    workout,
  });
};

// delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "id is invalid!",
    });
  }

  const workout = await Workouts.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ messag: " workout not found " });
  }

  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "id is invalid!",
    });
  }

  const workout = await Workouts.findOneAndUpdate(id, { ...req.body });

  if (!workout) {
    return res.status(404).json({ messag: " workout not found " });
  }

  res.status(200).json({
    workout,
  });
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutByID,
  deleteWorkout,
  updateWorkout,
};
