"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantManageCard from "@/components/restaurant/RestaurantManageCard";
import { apiFetch } from "@/lib/api";

export default function ManageRestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await apiFetch("/restaurants/mine"); // owner-scoped endpoint recommended
    const data = await res.json();
    setRestaurants(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const res = await apiFetch(`/restaurants/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Restaurants</h1>
            <Link
              href="/restaurants/create"
              className="flex items-center gap-2 px-4 py-2 bg-[#EE5F2B] text-white rounded-xl font-medium hover:bg-orange-600"
            >
              <Plus className="w-4 h-4" /> New Restaurant
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#EE5F2B]" />
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-4xl mb-3">🏪</p>
              <p className="font-semibold text-lg">No restaurants yet</p>
              <p className="text-gray-500 text-sm mt-1">Create your first restaurant to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {restaurants.map((r) => (
                <RestaurantManageCard key={r.id} restaurant={r} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}