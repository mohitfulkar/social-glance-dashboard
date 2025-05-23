
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clients } from "@/data/clientsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUp, BarChart3, Users, TrendingUp, Heart, 
  MessageCircle, Share, Eye, Calendar, PieChart
} from "lucide-react";
import { PieChart as RPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const ClientDashboard = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState<any>(null);
  
  useEffect(() => {
    // For now, we're using the static client data
    const foundClient = clients.find(c => c.id === clientId);
    setClient(foundClient);
  }, [clientId]);
  
  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-white">Loading client data...</p>
      </div>
    );
  }
  
  // Example data for charts
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
  
  // Mock metrics
  const metrics = {
    posts: Math.floor(Math.random() * 500) + 100,
    likes: Math.floor(Math.random() * 50000) + 10000,
    comments: Math.floor(Math.random() * 5000) + 1000,
    shares: Math.floor(Math.random() * 2000) + 500,
    impressions: Math.floor(Math.random() * 1000000) + 100000,
  };

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
            <Badge className={`${client.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'} border`}>
              {client.status}
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/30">
              {parseInt(client.followers.replace(/,/g, "")).toLocaleString()} followers
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-300 border-green-500/30">
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
                  <p className="text-2xl font-bold text-white">{metrics.posts}</p>
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
                  <p className="text-2xl font-bold text-white">{metrics.likes.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-white">{metrics.comments.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-white">{(metrics.impressions / 1000).toFixed(1)}K</p>
                </div>
                <Eye className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+15% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs with Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700/50">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">Analytics</TabsTrigger>
            <TabsTrigger value="engagement" className="text-white data-[state=active]:bg-purple-600">Engagement</TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-purple-600">Content</TabsTrigger>
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
                    <ChartContainer config={chartConfig} className="h-full w-full">
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
                    <ChartContainer config={chartConfig} className="h-full w-full">
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
                    <ChartContainer config={chartConfig} className="h-full w-full">
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
                    <ChartContainer config={chartConfig} className="h-full w-full">
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
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Additional Summary Cards for Analytics Tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Click-through Rate</h3>
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">4.2%</p>
                  <p className="text-green-400 text-sm mt-1">+0.3% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Conversion Rate</h3>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">2.8%</p>
                  <p className="text-green-400 text-sm mt-1">+0.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Average Engagement</h3>
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">8.7%</p>
                  <p className="text-green-400 text-sm mt-1">+1.2% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Reach</h3>
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">215K</p>
                  <p className="text-green-400 text-sm mt-1">+12% from last month</p>
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
                  <p className="text-3xl font-bold text-white">5.3%</p>
                  <p className="text-green-400 text-sm mt-1">+0.8% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Avg. Comments</h3>
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">42</p>
                  <p className="text-green-400 text-sm mt-1">+5 from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Shares per Post</h3>
                    <Share className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">18</p>
                  <p className="text-green-400 text-sm mt-1">+3 from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Response Rate</h3>
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">87%</p>
                  <p className="text-green-400 text-sm mt-1">+5% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Platform Engagement */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Platform Engagement</CardTitle>
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
                  <p className="text-green-400 text-sm mt-1">+28% engagement rate</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Post Frequency</h3>
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">4.2/week</p>
                  <p className="text-green-400 text-sm mt-1">+0.5 from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Video Views</h3>
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">12.5K</p>
                  <p className="text-green-400 text-sm mt-1">+18% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Content Score</h3>
                    <BarChart3 className="w-5 h-5 text-pink-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">8.7/10</p>
                  <p className="text-green-400 text-sm mt-1">+0.3 from last month</p>
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
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                          {client.platforms[i % client.platforms.length]}
                        </Badge>
                        <span className="text-gray-400 text-sm">{i + 1} days ago</span>
                      </div>
                      <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                        {[
                          "Just launched our new product line! Excited to share this journey with you all 🚀",
                          "Behind the scenes of our latest campaign. The team worked incredibly hard on this!",
                          "Quick tip Tuesday: Here's how you can improve your productivity by 50% 💡",
                          "We're thrilled to announce our partnership with @brand! Stay tuned for exciting collaborations.",
                          "Thank you for helping us reach 10k followers! We couldn't have done it without you."
                        ][i]}
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Heart className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 900) + 100}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <MessageCircle className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 90) + 10}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Share className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 40) + 5}</span>
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

export default ClientDashboard;
