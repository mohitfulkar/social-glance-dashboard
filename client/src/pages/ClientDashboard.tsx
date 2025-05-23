import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUp,
  BarChart3,
  Users,
  TrendingUp,
  Heart,
  MessageCircle,
  Share,
  Eye,
  Calendar,
  PieChart,
} from "lucide-react";
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ClientDashboard = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/profile/${clientId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiData = await response.json();

        if (apiData.success && apiData.data) {
          setClient(apiData.data.profile);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching client data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading client data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="text-red-400 mb-4">
            Error loading client data: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-white">Client not found</p>
      </div>
    );
  }

  // Extract data from API response
  const metrics = client.metrics || {};
  const analytics = client.analytics || {};
  const platformData = analytics.platformDistribution || [];
  const engagementData = analytics.engagementBreakdown || [];
  const weeklyData = analytics.weeklyPerformance || [];
  const monthlyGrowthData = analytics.monthlyGrowth || [];
  const recentPosts = client.recentPosts || [];
  const platformEngagement = client.platformEngagement || [];

  // Chart configuration
  const chartConfig = {
    platform: { label: "Platform Distribution" },
    engagement: { label: "Engagement Types" },
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Client Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-slate-900/70 border border-slate-800 rounded-lg">
          <div className="flex items-center">
            <img
              src={client.avatar}
              alt={client.name}
              className="w-16 h-16 rounded-full border-2 border-purple-500/30 mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">{client.name}</h1>
              <p className="text-gray-300">{client.company}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Badge
              className={`${
                client.status === "active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              } border`}
            >
              {client.status}
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-500/10 text-purple-300 border-purple-500/30"
            >
              {client.followers} followers
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-300 border-green-500/30"
            >
              <ArrowUp className="mr-1 h-3 w-3" />
              {client.growth}
            </Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Followers</p>
                  <p className="text-2xl font-bold text-white">
                    {client.followers}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">
                {client.growth} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">
                    Total Posts
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {metrics.posts?.toLocaleString() || "0"}
                  </p>
                </div>
                <Share className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-900/20 to-pink-800/20 border-pink-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-300 text-sm font-medium">
                    Total Likes
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {metrics.likes?.toLocaleString() || "0"}
                  </p>
                </div>
                <Heart className="w-8 h-8 text-pink-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Comments</p>
                  <p className="text-2xl font-bold text-white">
                    {metrics.comments?.toLocaleString() || "0"}
                  </p>
                </div>
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">
                +24% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">
                    Impressions
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {metrics.impressions
                      ? `${(metrics.impressions / 1000).toFixed(1)}K`
                      : "0"}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs with Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700/50">
            <TabsTrigger
              value="overview"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Engagement
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Content
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Distribution Pie Chart */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                    Platform Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={chartConfig}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RPieChart>
                          <Pie
                            data={platformData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RPieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Types Pie Chart */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-400" />
                    Engagement Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={chartConfig}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RPieChart>
                          <Pie
                            data={engagementData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {engagementData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RPieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Performance Bar Chart */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                    Weekly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={chartConfig}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                          <XAxis dataKey="day" stroke="#94A3B8" />
                          <YAxis stroke="#94A3B8" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="posts" fill="#8B5CF6" name="Posts" />
                          <Bar
                            dataKey="engagement"
                            fill="#06B6D4"
                            name="Engagement"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Growth Line Chart */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Follower Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={chartConfig}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyGrowthData}>
                          <XAxis dataKey="month" stroke="#94A3B8" />
                          <YAxis stroke="#94A3B8" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="followers"
                            stroke="#10B981"
                            strokeWidth={3}
                            dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Summary Cards for Analytics Tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">
                      Click-through Rate
                    </h3>
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.clickThroughRate || 0}%
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +0.3% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Conversion Rate</h3>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.conversionRate || 0}%
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +0.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">
                      Average Engagement
                    </h3>
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.averageEngagement || 0}%
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +1.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Reach</h3>
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.reach
                      ? `${(metrics.reach / 1000).toFixed(0)}K`
                      : "0"}
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            {/* Engagement Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Engagement Rate</h3>
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.engagementRate || 0}%
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +0.8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Avg. Comments</h3>
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.posts && metrics.comments
                      ? Math.round(metrics.comments / metrics.posts)
                      : 0}
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +5 from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Shares per Post</h3>
                    <Share className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.posts && metrics.shares
                      ? Math.round(metrics.shares / metrics.posts)
                      : 0}
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +3 from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Response Rate</h3>
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.responseRate || 0}%
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Engagement */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">
                  Platform Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformEngagement.map((platform, index) => (
                    <div
                      key={platform.platform}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {platform.platform.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {platform.platform}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {platform.followers} followers
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">
                          {platform.growth}
                        </p>
                        <p className="text-gray-400 text-sm">This month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            {/* Content Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Best Performing</h3>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">Image</p>
                  <p className="text-green-400 text-sm mt-1">
                    +28% engagement rate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Post Frequency</h3>
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.posts ? (metrics.posts / 30).toFixed(1) : "0"}/day
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +0.5 from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Total Shares</h3>
                    <Share className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.shares
                      ? `${(metrics.shares / 1000).toFixed(1)}K`
                      : "0"}
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Engagement Score</h3>
                    <BarChart3 className="w-5 h-5 text-pink-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {metrics.engagementRate
                      ? `${metrics.engagementRate}/10`
                      : "0/10"}
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    +0.3 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Posts */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Recent Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.length > 0 ? (
                    recentPosts.map((post, i) => (
                      <div key={i} className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <Badge
                            variant="outline"
                            className="text-purple-400 border-purple-500/30"
                          >
                            {post.platform}
                          </Badge>
                          <span className="text-gray-400 text-sm">
                            {post.daysAgo} days ago
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Share className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-8">
                      No recent posts available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
