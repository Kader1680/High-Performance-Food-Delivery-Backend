"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Bell, Search, Menu, X, Home, ClipboardList, BarChart3, MapPin, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Orders", path: "/orders", icon: ClipboardList },
    { label: "Tracking", path: "/tracking", icon: MapPin },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    // { label: "Profile", path: "/profile", icon: UserCircle },
  ];

  const isActive = (path) => pathname === path;
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#EE5F2B] flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Foodie</span>
          </Link>
 
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-[#EE5F2B] text-white shadow-md"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/search" className="p-2 rounded-xl hover:bg-gray-100">
              <Search className="w-5 h-5 text-gray-600" />
            </Link>
            {
                isAuthenticated ? (
                    <>
                         <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100">
                        profile
                             </Link>
                    </>
                ) : <></>
            }

            <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            <button
              className="relative p-2 rounded-xl hover:bg-gray-100"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#EE5F2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
 <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 text-sm font-medium"
              >
                 
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 text-sm text-gray-500"
              >
                 
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[#EE5F2B] text-white hover:bg-orange-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-[#EE5F2B] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}