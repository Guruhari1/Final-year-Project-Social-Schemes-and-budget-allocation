const mongoose = require("mongoose");

const SchemeFormSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schemeName: { type: String, required: true },
  applicationData: { type: Object, required: true }, // Stores form fields dynamically
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SchemeForm", SchemeFormSchema);
