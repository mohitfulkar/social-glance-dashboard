
import { useState } from "react";
import ClientCard from "@/components/ClientCard";
import { clients } from "@/data/clientsData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="relative px-6 py-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              Social Media Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in">
              Manage all your clients' social media presence from one powerful platform
            </p>
          </div>
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {clients.map((client, index) => (
            <ClientCard 
              key={client.id} 
              client={client} 
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
