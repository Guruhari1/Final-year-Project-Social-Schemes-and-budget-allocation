import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FiUser, FiCreditCard, FiPhone, FiDollarSign, FiBriefcase, FiBook, FiCalendar, FiHeart, FiMapPin, FiUsers, FiHome, FiActivity } from "react-icons/fi";

const ApplicationForm = () => {
  const { schemeName } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    aadharNumber: "",
    phoneNumber: "",
    income: "",
    occupation: "",
    education: "",
    age: "",
    maritalStatus: "",
    state: "",
    district: "",
    dependents: "",
    landOwned: "",
    healthConditions: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/forms/submit",
        { schemeName, applicationData: formData },
        { headers: { Authorization: token } }
      );
      
      setIsSubmitting(false);
      navigate("/dashboard", { state: { success: "Application submitted successfully!" } });
    } catch (error) {
      setError(error.response?.data?.message || "Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: "fullName", placeholder: "Full Name", icon: <FiUser />, type: "text" },
    { name: "aadharNumber", placeholder: "Aadhar Number", icon: <FiCreditCard />, type: "text" },
    { name: "phoneNumber", placeholder: "Phone Number", icon: <FiPhone />, type: "tel" },
    { name: "income", placeholder: "Annual Income (₹)", icon: <FiDollarSign />, type: "number" },
    { name: "occupation", placeholder: "Occupation", icon: <FiBriefcase />, type: "text" },
    { name: "education", placeholder: "Highest Education Level", icon: <FiBook />, type: "text" },
    { name: "age", placeholder: "Age", icon: <FiCalendar />, type: "number" },
    { name: "maritalStatus", placeholder: "Marital Status", icon: <FiHeart />, type: "text" },
    { name: "state", placeholder: "State", icon: <FiMapPin />, type: "text" },
    { name: "district", placeholder: "District", icon: <FiMapPin />, type: "text" },
    { name: "dependents", placeholder: "Number of Dependents", icon: <FiUsers />, type: "number" },
    { name: "landOwned", placeholder: "Land Owned (acres)", icon: <FiHome />, type: "number" },
    { name: "healthConditions", placeholder: "Health Conditions", icon: <FiActivity />, type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-2xl font-bold">{schemeName} Application</h2>
            <p className="mt-2 text-blue-100">Please fill out all required fields to apply for this scheme</p>
          </div>

          {error && (
            <motion.div 
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-6 mt-6 rounded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.placeholder}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                      required
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: formFields.length * 0.05 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationForm;