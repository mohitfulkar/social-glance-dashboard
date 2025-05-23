
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart3, Users, Star, Shield } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Social Media Management Platform
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Manage all your social media profiles in one powerful dashboard
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/login">
                    Client Login
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-purple-500 text-white hover:bg-purple-900/20">
                  <Link to="/admin-login">
                    Admin Login
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg blur-xl opacity-30"></div>
                <div className="relative bg-slate-800 border border-slate-700/50 rounded-lg p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 flex flex-col items-center">
                      <BarChart3 className="h-8 w-8 text-purple-400 mb-2" />
                      <span className="text-white font-medium">Analytics</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 flex flex-col items-center">
                      <Users className="h-8 w-8 text-pink-400 mb-2" />
                      <span className="text-white font-medium">Audience</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 flex flex-col items-center">
                      <Shield className="h-8 w-8 text-blue-400 mb-2" />
                      <span className="text-white font-medium">Security</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 flex flex-col items-center">
                      <Star className="h-8 w-8 text-yellow-400 mb-2" />
                      <span className="text-white font-medium">Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Powerful Features for Social Media Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-purple-800/30">
              <div className="bg-purple-600/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Analytics Dashboard</h3>
              <p className="text-gray-300">
                Comprehensive analytics to track performance across all platforms in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-pink-800/30">
              <div className="bg-pink-600/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Audience Insights</h3>
              <p className="text-gray-300">
                Deep understanding of your audience demographics and engagement patterns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-blue-800/30">
              <div className="bg-blue-600/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Secure Management</h3>
              <p className="text-gray-300">
                Role-based access control and secure management of all your social media accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-purple-900/70">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to boost your social media presence?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get started today and transform how you manage your social platforms
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/login">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-auto">
        <div className="container mx-auto px-6">
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center">
              © {new Date().getFullYear()} Social Media Dashboard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
