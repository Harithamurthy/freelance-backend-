// const express = require("express");
// const authMiddleware = require("../middleware/authMiddleware");
// const Job = require("../models/Job");

// const router = express.Router();

// // POST /api/jobs
// // Protected route to post a new job
// router.post("/", authMiddleware, async (req, res) => {
//   const { title, description, category, budget } = req.body;

//   if (!title || !description || !category || !budget) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const newJob = new Job({
//       title,
//       description,
//       category,
//       budget,
//       user: req.user.userId, // Store the user ID from the token
//     });

//     await newJob.save();
//     res.status(201).json({ message: "Job posted successfully", job: newJob });
//   } catch (error) {
//     console.error("Job posting error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /api/jobs
// // Public route to fetch all jobs (can be accessed by anyone)
// router.get("/", async (req, res) => {
//   try {
//     const jobs = await Job.find();  // Fetch all jobs from the database
//     res.status(200).json(jobs);     // Send the jobs as a response
//   } catch (error) {
//     console.error("Error fetching jobs:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// module.exports = router;

//working code ...............above 




//new 
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

//  POST /api/jobs - Post a new job (only logged-in users)
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
      user: req.user.id, // Store the user ID from the token
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Job posting error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/jobs - Fetch all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from the database
    res.status(200).json(jobs); // Send the jobs as a response
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

//  POST /api/jobs/:id/apply - Apply for a job
router.post("/:id/apply", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // Check if the user already applied for this job
    const existingApplication = await Application.findOne({ jobId, userId });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    // Create a new application
    const application = new Application({
      jobId,
      userId,
      status: "Applied",
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Apply Error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

//  GET /api/jobs/:id/applicants - Fetch applicants for a specific job (for employers)
router.get("/:id/applicants", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ jobId }).populate("userId", "name email");

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;




