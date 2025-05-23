
import { useParams, useNavigate } from "react-router-dom";
import { clients } from "@/data/clientsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Users, Heart, MessageCircle, Share, Eye, Calendar, BarChart3 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer, Legend } from "recharts";

const SocialMediaDashboard = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  
  const client = clients.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Client Not Found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const mockMetrics = {
    totalPosts: Math.floor(Math.random() * 500) + 100,
    totalLikes: Math.floor(Math.random() * 50000) + 10000,
    totalComments: Math.floor(Math.random() * 5000) + 1000,
    totalShares: Math.floor(Math.random() * 2000) + 500,
    impressions: Math.floor(Math.random() * 1000000) + 100000,
  };

  // Chart data
  const platformData = [
    { name: 'Instagram', value: 35, color: '#E4405F' },
    { name: 'Facebook', value: 25, color: '#1877F2' },
    { name: 'Twitter', value: 20, color: '#1DA1F2' },
    { name: 'LinkedIn', value: 15, color: '#0A66C2' },
    { name: 'TikTok', value: 5, color: '#000000' }
  ];

  const engagementData = [
    { name: 'Likes', value: 45, color: '#FF6B6B' },
    { name: 'Comments', value: 25, color: '#4ECDC4' },
    { name: 'Shares', value: 20, color: '#45B7D1' },
    { name: 'Saves', value: 10, color: '#96CEB4' }
  ];

  const weeklyData = [
    { day: 'Mon', posts: 12, engagement: 850 },
    { day: 'Tue', posts: 15, engagement: 920 },
    { day: 'Wed', posts: 8, engagement: 750 },
    { day: 'Thu', posts: 18, engagement: 1100 },
    { day: 'Fri', posts: 22, engagement: 1350 },
    { day: 'Sat', posts: 25, engagement: 1500 },
    { day: 'Sun', posts: 20, engagement: 1200 }
  ];

  const monthlyGrowthData = [
    { month: 'Jan', followers: 1200 },
    { month: 'Feb', followers: 1450 },
    { month: 'Mar', followers: 1680 },
    { month: 'Apr', followers: 1950 },
    { month: 'May', followers: 2300 },
    { month: 'Jun', followers: 2650 }
  ];

  const recentPosts = [
    {
      id: 1,
      content: "Just launched our new product line! Excited to share this journey with you all 🚀",
      platform: "Instagram",
      likes: 1234,
      comments: 87,
      shares: 23,
      time: "2 hours ago"
    },
    {
      id: 2,
      content: "Behind the scenes of our latest campaign. The team worked incredibly hard on this!",
      platform: "LinkedIn",
      likes: 892,
      comments: 45,
      shares: 67,
      time: "1 day ago"
    },
    {
      id: 3,
      content: "Quick tip Tuesday: Here's how you can improve your productivity by 50% 💡",
      platform: "Twitter",
      likes: 567,
      comments: 123,
      shares: 89,
      time: "2 days ago"
    }
  ];

  const chartConfig = {
    platform: {
      label: "Platform Distribution",
    },
    engagement: {
      label: "Engagement Types",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-4">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-500/30"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">{client.name}</h1>
                  <p className="text-gray-300">{client.company}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={`${client.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'} border`}>
                {client.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Followers</p>
                  <p className="text-2xl font-bold text-white">{client.followers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">{client.growth} from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{mockMetrics.totalPosts}</p>
                </div>
                <Share className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-900/20 to-pink-800/20 border-pink-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-300 text-sm font-medium">Total Likes</p>
                  <p className="text-2xl font-bold text-white">{mockMetrics.totalLikes.toLocaleString()}</p>
                </div>
                <Heart className="w-8 h-8 text-pink-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Comments</p>
                  <p className="text-2xl font-bold text-white">{mockMetrics.totalComments.toLocaleString()}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+24% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Impressions</p>
                  <p className="text-2xl font-bold text-white">{(mockMetrics.impressions / 1000).toFixed(1)}K</p>
                </div>
                <Eye className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700/50">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">Analytics</TabsTrigger>
            <TabsTrigger value="engagement" className="text-white data-[state=active]:bg-purple-600">Engagement</TabsTrigger>
            <TabsTrigger value="posts" className="text-white data-[state=active]:bg-purple-600">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Distribution Pie Chart */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                    Platform Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
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
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <XAxis dataKey="day" stroke="#94A3B8" />
                        <YAxis stroke="#94A3B8" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="posts" fill="#8B5CF6" name="Posts" />
                        <Bar dataKey="engagement" fill="#06B6D4" name="Engagement" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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
                  <ChartContainer config={chartConfig} className="h-[300px]">
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
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            {/* Platform Performance */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                  Platform Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.platforms.map((platform, index) => (
                    <div key={platform} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{platform.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{platform}</p>
                          <p className="text-gray-400 text-sm">
                            {Math.floor(Math.random() * 50) + 10}K followers
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">+{Math.floor(Math.random() * 20) + 5}%</p>
                        <p className="text-gray-400 text-sm">This month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            {/* Recent Posts */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                          {post.platform}
                        </Badge>
                        <span className="text-gray-400 text-sm">{post.time}</span>
                      </div>
                      <p className="text-gray-300 mb-3 text-sm leading-relaxed">{post.content}</p>
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
