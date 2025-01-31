const Application = require("../models/Application"); // Import Application model
const Job = require("../models/Job"); // Import Job model
const User = require("../models/User"); // Import User model

// Apply for a Job
exports.applyForJob = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token
    const { jobId } = req.params;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({ job: jobId, user: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Create new application
    const newApplication = new Application({
      job: jobId,
      user: userId,
      status: "Pending", // Default status
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all applications for a logged-in freelancer
exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ user: userId }).populate("job", "title company status dateApplied");

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all applications for a manager to review
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("job", "title").populate("user", "name email");

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
