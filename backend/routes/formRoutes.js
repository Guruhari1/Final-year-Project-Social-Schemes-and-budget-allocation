const express = require("express");
const SchemeForm = require("../models/SchemeForm");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Submit Scheme Form
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { schemeName, applicationData } = req.body;
    const newForm = new SchemeForm({ userId: req.user.userId, schemeName, applicationData });
    await newForm.save();
    res.status(201).json({ message: "Form Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get User's Submitted Forms
router.get("/my-forms", authMiddleware, async (req, res) => {
  try {
    const forms = await SchemeForm.find({ userId: req.user.userId });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Fetch form statistics (mean, median, mode)
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const forms = await SchemeForm.find();
    
    let incomeData = forms.map(form => Number(form.applicationData.income)).filter(val => !isNaN(val));

    if (incomeData.length === 0) {
      return res.json({ message: "No numeric data available for analysis" });
    }

    // Calculate Mean
    const mean = incomeData.reduce((a, b) => a + b, 0) / incomeData.length;

    // Calculate Median
    incomeData.sort((a, b) => a - b);
    const middle = Math.floor(incomeData.length / 2);
    const median = incomeData.length % 2 === 0 ? (incomeData[middle - 1] + incomeData[middle]) / 2 : incomeData[middle];

    // Calculate Mode
    const frequency = {};
    let mode = [];
    let maxFreq = 0;
    incomeData.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
        mode = [num];
      } else if (frequency[num] === maxFreq) {
        mode.push(num);
      }
    });

    res.json({ mean, median, mode });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/advanced-stats", authMiddleware, async (req, res) => {
  try {
    const forms = await SchemeForm.find();

    let incomes = forms.map(f => Number(f.applicationData.income)).filter(n => !isNaN(n));
    let ages = forms.map(f => Number(f.applicationData.age)).filter(n => !isNaN(n));
    let landOwned = forms.map(f => Number(f.applicationData.landOwned)).filter(n => !isNaN(n));
    
    const calculateStats = (arr) => ({
      mean: arr.reduce((a, b) => a + b, 0) / arr.length,
      median: arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)],
      mode: Object.entries(arr.reduce((acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc), {})).sort((a, b) => b[1] - a[1])[0][0],
    });

    res.json({
      incomeStats: calculateStats(incomes),
      ageStats: calculateStats(ages),
      landOwnedStats: calculateStats(landOwned),
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
