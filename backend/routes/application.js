// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const Application = require("../models/Application");

// router.get("/my-applications", authMiddleware, async (req, res) => {
//   try {
//     const applications = await Application.find({ userId: req.user.userId });
//     res.json(applications);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
//-------

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Application = require("../models/Application");
const Job = require("../models/Job");

const router = express.Router();

// GET /api/applications/my-applications
router.get("/my-applications", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Get logged-in user's ID

    const applications = await Application.find({ userId }).populate("jobId"); // Populate job details

    const formattedApplications = applications.map((app) => ({
      _id: app._id,
      jobTitle: app.jobId.title, // Ensure job title is included
      company: app.jobId.company || "N/A", // Add company name if available
      status: app.status,
      dateApplied: app.createdAt, // Use createdAt as application date
    }));

    res.status(200).json(formattedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
