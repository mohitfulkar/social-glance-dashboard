
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users } from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string;
  avatar: string;
  followers: string;
  engagement: string;
  growth: string;
  platforms: string[];
  status: "active" | "inactive" | "pending";
}

interface ClientCardProps {
  client: Client;
  index: number;
}

const ClientCard = ({ client, index }: ClientCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/${client.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-500 cursor-pointer hover:scale-105 hover:border-purple-500/50 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleCardClick}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="p-6 relative z-10">
        {/* Avatar and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <img
              src={client.avatar}
              alt={client.name}
              className="w-16 h-16 rounded-full border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800"></div>
          </div>
          <Badge className={`${getStatusColor(client.status)} border`}>
            {client.status}
          </Badge>
        </div>

        {/* Client Info */}
        <div className="mb-4">
          <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-purple-300 transition-colors">
            {client.name}
          </h3>
          <p className="text-gray-400 text-sm">{client.company}</p>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-300">
              <Users className="w-4 h-4" />
              <span className="text-sm">Followers</span>
            </div>
            <span className="text-white font-medium">{client.followers}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-300">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Growth</span>
            </div>
            <span className="text-green-400 font-medium">{client.growth}</span>
          </div>
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1 mb-4">
          {client.platforms.map((platform) => (
            <Badge
              key={platform}
              variant="secondary"
              className="text-xs bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
            >
              {platform}
            </Badge>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <span className="text-sm text-gray-400">View Dashboard</span>
          <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
