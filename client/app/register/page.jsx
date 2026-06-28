"use client";

 
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#EE5F2B]">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Create New Account</p>
        </div>

        {/* Google button */}
        <button className="w-full border rounded-lg h-12 mb-6 font-medium hover:bg-gray-50">
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="border-t"></div>
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-sm text-gray-400">
            OR
          </span>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}


          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <div className="relative">
              
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 border rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>



          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Password</label>
              <a
                href="#"
                className="text-sm text-[#EE5F2B] hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full h-12 bg-[#EE5F2B] text-white rounded-lg font-semibold hover:bg-blue-700">
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <span className="text-[#EE5F2B] cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}