import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter,
  Treemap, ReferenceLine
} from "recharts";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FiTrendingUp, FiUsers, FiDollarSign, FiMapPin, FiPieChart, FiBarChart2,FiCheck,FiClock,FiX    } from "react-icons/fi";

// Dummy data for demonstration
const dummyStats = {
  overview: {
    totalApplications: 1243,
    approved: 892,
    pending: 231,
    rejected: 120,
    avgProcessingTime: "2.4 days"
  },
  incomeStats: {
    mean: 185000,
    median: 152000,
    mode: 125000,
    distribution: [
      { range: "0-50k", count: 120 },
      { range: "50k-1L", count: 320 },
      { range: "1L-2L", count: 450 },
      { range: "2L-5L", count: 280 },
      { range: "5L+", count: 73 }
    ]
  },
  ageStats: {
    mean: 42,
    median: 39,
    mode: 35,
    distribution: [
      { age: "18-25", count: 85 },
      { age: "26-35", count: 320 },
      { age: "36-45", count: 420 },
      { age: "46-55", count: 280 },
      { age: "56+", count: 138 }
    ]
  },
  landOwnedStats: {
    mean: 2.4,
    median: 1.8,
    mode: 1.5,
    distribution: [
      { range: "0-1 acre", count: 520 },
      { range: "1-2 acres", count: 380 },
      { range: "2-5 acres", count: 210 },
      { range: "5-10 acres", count: 85 },
      { range: "10+ acres", count: 48 }
    ]
  },
  schemePerformance: [
    { name: "MUDRA Loan", applications: 420, approvalRate: 78, avgAmount: 50000 },
    { name: "PM Kisan", applications: 380, approvalRate: 92, avgAmount: 6000 },
    { name: "Ayushman Bharat", applications: 210, approvalRate: 85, avgAmount: 500000 },
    { name: "Stand-Up India", applications: 150, approvalRate: 72, avgAmount: 1000000 },
    { name: "PMAY", applications: 83, approvalRate: 65, avgAmount: 250000 }
  ],
  regionalData: [
    { state: "Maharashtra", applications: 280, approvalRate: 82 },
    { state: "Uttar Pradesh", applications: 210, approvalRate: 75 },
    { state: "West Bengal", applications: 180, approvalRate: 68 },
    { state: "Tamil Nadu", applications: 150, approvalRate: 88 },
    { state: "Rajasthan", applications: 120, approvalRate: 72 },
    { state: "Karnataka", applications: 110, approvalRate: 85 },
    { state: "Gujarat", applications: 95, approvalRate: 78 }
  ],
  monthlyTrends: [
    { month: "Jan", applications: 85, approvals: 62 },
    { month: "Feb", applications: 92, approvals: 70 },
    { month: "Mar", applications: 110, approvals: 88 },
    { month: "Apr", applications: 105, approvals: 82 },
    { month: "May", applications: 120, approvals: 95 },
    { month: "Jun", applications: 135, approvals: 110 },
    { month: "Jul", applications: 142, approvals: 118 },
    { month: "Aug", applications: 130, approvals: 105 },
    { month: "Sep", applications: 125, approvals: 102 },
    { month: "Oct", applications: 115, approvals: 95 },
    { month: "Nov", applications: 98, approvals: 80 },
    { month: "Dec", applications: 85, approvals: 65 }
  ]
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

const DataAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("12m");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API:
        // const token = localStorage.getItem("token");
        // const res = await axios.get("http://localhost:5000/api/forms/advanced-stats", {
        //   headers: { Authorization: token },
        // });
        // setStats(res.data);
        
        // For demo purposes, we're using dummy data with a delay
        setTimeout(() => {
          setStats(dummyStats);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Total Applications</p>
            <h3 className="text-3xl font-bold">{stats.overview.totalApplications}</h3>
          </div>
          <FiTrendingUp className="h-10 w-10 opacity-70" />
        </div>
        <div className="mt-4 pt-4 border-t border-blue-400">
          <p className="text-sm">Last 30 days: +12.5%</p>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Approved</p>
            <h3 className="text-3xl font-bold">{stats.overview.approved}</h3>
            <p className="text-sm mt-1">({Math.round((stats.overview.approved / stats.overview.totalApplications) * 100)}% approval rate)</p>
          </div>
          <FiCheck className="h-10 w-10 opacity-70" />
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Pending</p>
            <h3 className="text-3xl font-bold">{stats.overview.pending}</h3>
          </div>
          <FiClock className="h-10 w-10 opacity-70" />
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Rejected</p>
            <h3 className="text-3xl font-bold">{stats.overview.rejected}</h3>
          </div>
          <FiX className="h-10 w-10 opacity-70" />
        </div>
      </motion.div>
    </div>
  );

  const renderTimeRangeSelector = () => (
    <div className="flex space-x-2 mb-6">
      {["7d", "30d", "3m", "6m", "12m", "All"].map((range) => (
        <motion.button
          key={range}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            timeRange === range
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTimeRange(range)}
        >
          {range}
        </motion.button>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            {renderOverviewCards()}
            {renderTimeRangeSelector()}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTrendingUp className="mr-2 text-blue-500" /> Monthly Application Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={stats.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="applications" stroke="#3B82F6" fill="#93C5FD" />
                    <Area type="monotone" dataKey="approvals" stroke="#10B981" fill="#6EE7B7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiUsers className="mr-2 text-green-500" /> Age Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.ageStats.distribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiDollarSign className="mr-2 text-purple-500" /> Income Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.incomeStats.distribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiMapPin className="mr-2 text-yellow-500" /> Regional Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="applications" name="Applications" />
                    <YAxis type="number" dataKey="approvalRate" name="Approval Rate" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="States" data={stats.regionalData} fill="#F59E0B" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        );
      case "schemes":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Scheme Performance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart outerRadius={150} data={stats.schemePerformance}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Approval Rate" dataKey="approvalRate" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Applications by Scheme</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.schemePerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="applications"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.schemePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Average Amount by Scheme</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.schemePerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgAmount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case "demographics":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Land Ownership Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.landOwnedStats.distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Income vs Land Owned</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="income" name="Income (₹)" />
                    <YAxis type="number" dataKey="landOwned" name="Land (acres)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Applicants" data={[
                      { income: 50000, landOwned: 0.5 },
                      { income: 75000, landOwned: 1.2 },
                      { income: 100000, landOwned: 2.5 },
                      { income: 150000, landOwned: 3.0 },
                      { income: 200000, landOwned: 4.5 },
                      { income: 250000, landOwned: 5.0 },
                      { income: 300000, landOwned: 7.5 },
                      { income: 400000, landOwned: 10.0 },
                    ]} fill="#3B82F6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Age vs Income</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="age" name="Age" />
                    <YAxis type="number" dataKey="income" name="Income (₹)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Applicants" data={[
                      { age: 22, income: 45000 },
                      { age: 28, income: 65000 },
                      { age: 35, income: 120000 },
                      { age: 42, income: 180000 },
                      { age: 50, income: 220000 },
                      { age: 58, income: 150000 },
                      { age: 65, income: 80000 },
                    ]} fill="#10B981" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-2xl font-bold">Data Analytics Dashboard</h2>
            <p className="mt-2 text-blue-100">Comprehensive insights into scheme applications and performance</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="p-6">
              {/* Tabs */}
              <div className="flex space-x-2 mb-6 border-b border-gray-200">
                {["overview", "schemes", "demographics"].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                      activeTab === tab
                        ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>

              {renderTabContent()}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DataAnalytics;