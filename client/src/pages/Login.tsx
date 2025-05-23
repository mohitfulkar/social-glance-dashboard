import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, User } from "lucide-react";
import axios from "axios";

const Login = ({ isAdmin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isAdmin) {
      if (email === "admin@gmail.com" && password === "admin") {
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        navigate("/admin-dashboard");
      } else {
        alert("Invalid admin credentials");
      }
    } else {
      try {
        const res = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        const { user, token } = res.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        navigate(`/dashboard/${user.id}`);
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || "Login failed";
        alert(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="backdrop-blur-sm bg-slate-900/80 border-slate-800 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isAdmin ? "Admin Login" : "Client Login"}
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-slate-800 border-slate-700 pl-10 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-slate-800 border-slate-700 pl-10 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Don't have an account? Contact your administrator
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
