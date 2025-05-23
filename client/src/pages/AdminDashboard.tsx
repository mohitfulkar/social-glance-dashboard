import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  ChevronRight,
} from "lucide-react";
// import { Link } from "react-router-dom"; // Commented out as not supported in artifacts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    averageGrowth: "0%",
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/profile/profile-stats"
      );
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to load dashboard statistics");
    }
  };

  // Fetch clients data
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile");
      if (!response.ok) throw new Error("Failed to fetch clients");
      const result = await response.json();
      if (result.success) {
        setClients(result.data);
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to load client data");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchClients()]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Calculate total followers from clients data
  const totalFollowers = clients.reduce((sum, client) => {
    const followersNum = parseInt(client.followers.replace(/,/g, ""));
    return sum + followersNum;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 py-8 px-4 md:px-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 py-8 px-4 md:px-6 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 md:px-6">
      <button
        className="bg-white rounded-lg px-6 py-3 mb-3"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Monitor and manage all client accounts
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">
                    Total Clients
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalUsers}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">
                    Active Clients
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.activeUsers}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+1 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-900/20 to-pink-800/20 border-pink-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-300 text-sm font-medium">
                    Total Audience
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {totalFollowers.toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-pink-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">
                +10% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">
                    Average Growth
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.averageGrowth}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Client List */}
        <Card className="bg-slate-900/70 border-slate-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-400" />
              Client Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-slate-800">
                    <th className="text-left px-4 py-3 font-medium">Name</th>
                    <th className="text-left px-4 py-3 font-medium">Company</th>
                    <th className="text-left px-4 py-3 font-medium">
                      Platforms
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">
                      Followers
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Growth</th>
                    <th className="text-right px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client._id}
                      className="border-b border-slate-800 hover:bg-slate-800/30"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img
                            src={client.avatar}
                            alt={client.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span className="text-white">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {client.company}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {client.platforms.slice(0, 3).map((platform) => (
                            <Badge
                              key={platform}
                              variant="outline"
                              className="text-xs bg-slate-800 border-slate-700"
                            >
                              {platform}
                            </Badge>
                          ))}
                          {client.platforms.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-slate-800 border-slate-700"
                            >
                              +{client.platforms.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={`
                            ${
                              client.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : client.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            } 
                            border
                          `}
                        >
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {client.followers}
                      </td>
                      <td className="px-4 py-3 text-green-400">
                        {client.growth}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/dashboard/${client.id}`)}
                        >
                          View
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
