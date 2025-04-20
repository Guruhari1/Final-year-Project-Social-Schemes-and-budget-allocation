import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const schemes = [
  { 
    name: "MUDRA Loan", 
    description: "Provides financial support to small businesses and entrepreneurs.", 
    category: "Business",
    deadline: "2023-12-31",
    status: "active"
  },
  { 
    name: "Ayushman Bharat", 
    description: "Health insurance scheme providing coverage of ₹5 lakh per family per year.", 
    category: "Health",
    deadline: "Ongoing",
    status: "active"
  },
  { 
    name: "PM Kisan", 
    description: "Direct income support of ₹6,000 per year to small and marginal farmers.", 
    category: "Agriculture",
    deadline: "2023-11-30",
    status: "active"
  },
  { 
    name: "Stand-Up India", 
    description: "Promotes entrepreneurship among women, SC & ST by providing loans.", 
    category: "Business",
    deadline: "2023-10-15",
    status: "ending"
  },
  { 
    name: "PMAY", 
    description: "Housing for All by 2022 mission providing affordable housing.", 
    category: "Housing",
    deadline: "2023-09-30",
    status: "ending"
  },
  { 
    name: "Skill India", 
    description: "National skill development program to empower youth with employable skills.", 
    category: "Education",
    deadline: "Ongoing",
    status: "active"
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    // Mock fetching user info (Replace with API call if needed)
    setUser({ 
      name: "John Doe",
      location: "New Delhi, India",
      eligibility: "5 schemes available"
    });
  }, [navigate]);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && scheme.status === "active") ||
                      (activeTab === "ending" && scheme.status === "ending");
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Welcome back, <span className="text-blue-600">{user?.name}</span>
                </h1>
                <p className="text-gray-600 mt-2">
                  Here are the government schemes available for you.
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-blue-100 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Location:</span> {user?.location}
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <span className="font-semibold">Eligibility:</span> {user?.eligibility}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search schemes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {["all", "active", "ending"].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition duration-200 ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((scheme, index) => (
                <motion.div
                  key={scheme.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition duration-200"
                  onClick={() => navigate(`/apply/${scheme.name}`)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          scheme.category === "Business" ? "bg-purple-100 text-purple-800" :
                          scheme.category === "Health" ? "bg-green-100 text-green-800" :
                          scheme.category === "Agriculture" ? "bg-yellow-100 text-yellow-800" :
                          scheme.category === "Housing" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {scheme.category}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-gray-900">{scheme.name}</h3>
                      </div>
                      {scheme.status === "active" ? (
                        <FiCheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <FiAlertCircle className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{scheme.description}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1.5 h-4 w-4 flex-shrink-0" />
                        <span>Deadline: {scheme.deadline}</span>
                      </div>
                      <div className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-200">
                        <span className="text-sm font-medium">Apply now</span>
                        <FiChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full py-12 text-center"
              >
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No schemes found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;