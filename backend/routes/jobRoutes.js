// const express = require("express");
// const { postJob, getJobs } = require("../controllers/jobController");
// const router = express.Router();

// router.post("/post-job", postJob); // Endpoint to post a job
// router.get("/jobs", getJobs); // Endpoint to get all jobs

// module.exports = router;



const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");

const router = express.Router();

// POST /api/jobs
// Protected route to post a new job
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, category, budget } = req.body;

  if (!title || !description || !category || !budget) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newJob = new Job({
      title,
      description,
      category,
      budget,
      user: req.user.userId, // Store the user ID from the token
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Job posting error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/jobs
// Public route to fetch all jobs (can be accessed by anyone)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();  // Fetch all jobs from the database
    res.status(200).json(jobs);     // Send the jobs as a response
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
