import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiClock, FiCheck, FiX, FiFileText, FiUser, FiPhone, FiDollarSign, FiBriefcase, FiBook, FiCalendar, FiHeart, FiMapPin, FiUsers, FiHome, FiActivity,FiCreditCard } from "react-icons/fi";

const Profile = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/forms/my-forms", {
          headers: { Authorization: token },
        });
        setForms(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch applications");
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  const toggleFormDetails = (form) => {
    if (selectedForm && selectedForm._id === form._id) {
      setSelectedForm(null);
    } else {
      setSelectedForm(form);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheck className="mr-1" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiX className="mr-1" /> Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-2xl font-bold">My Applications</h2>
            <p className="mt-2 text-blue-100">View and manage all your submitted applications</p>
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

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : forms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <FiFileText className="h-full w-full" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No applications submitted yet</h3>
                <p className="mt-1 text-gray-500">Get started by applying to one of our available schemes.</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {forms.map((form) => (
                  <motion.div
                    key={form._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFormDetails(form)}
                      className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          <FiFileText className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">{form.schemeName}</h3>
                          <p className="text-sm text-gray-500">
                            Submitted on: {new Date(form.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(form.status || "pending")}
                        {selectedForm && selectedForm._id === form._id ? (
                          <FiChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <FiChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {selectedForm && selectedForm._id === form._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-900 mb-3">Application Details</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiUser className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Full Name</p>
                                  <p className="font-medium">{form.applicationData.fullName}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiCreditCard className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Aadhar Number</p>
                                  <p className="font-medium">{form.applicationData.aadharNumber}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiPhone className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Phone Number</p>
                                  <p className="font-medium">{form.applicationData.phoneNumber}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiDollarSign className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Annual Income</p>
                                  <p className="font-medium">₹{form.applicationData.income}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiBriefcase className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Occupation</p>
                                  <p className="font-medium">{form.applicationData.occupation}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiBook className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Education</p>
                                  <p className="font-medium">{form.applicationData.education}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiCalendar className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Age</p>
                                  <p className="font-medium">{form.applicationData.age}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiHeart className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Marital Status</p>
                                  <p className="font-medium">{form.applicationData.maritalStatus}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiMapPin className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Location</p>
                                  <p className="font-medium">
                                    {form.applicationData.district}, {form.applicationData.state}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiUsers className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Dependents</p>
                                  <p className="font-medium">{form.applicationData.dependents}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiHome className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Land Owned</p>
                                  <p className="font-medium">{form.applicationData.landOwned} acres</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                                  <FiActivity className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Health Conditions</p>
                                  <p className="font-medium">{form.applicationData.healthConditions}</p>
                                </div>
                              </div>
                            </div>

                            {form.status === "rejected" && form.rejectionReason && (
                              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                <h5 className="font-medium text-red-800">Reason for Rejection</h5>
                                <p className="text-sm text-red-600">{form.rejectionReason}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;