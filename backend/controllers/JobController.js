const Job = require("../models/Job");

// POST a new job
const postJob = async (req, res) => {
  try {
    const { title, description, category, budget } = req.body;
    const newJob = new Job({ title, description, category, budget });
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Error posting job" });
  }
};

// GET all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

module.exports = { postJob, getJobs };
