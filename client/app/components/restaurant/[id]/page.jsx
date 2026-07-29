"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantForm from "@/components/restaurant/RestaurantForm";
import { apiFetch } from "@/lib/api";

export default function EditRestaurantPage() {
  const router = useRouter();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await apiFetch(`/restaurants/${id}`);
      const data = await res.json();
      setRestaurant(data);
      setLoading(false);
    };
    load();
  }, [id]);

  const handleUpdate = async (form) => {
    const res = await apiFetch(`/restaurants/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update restaurant");
    router.push("/restaurants/manage");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#EE5F2B]" />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#EE5F2B]">Edit Restaurant</h1>
                <p className="text-gray-500 mt-2">Update your restaurant details</p>
              </div>
              <RestaurantForm
                initialData={restaurant}
                onSubmit={handleUpdate}
                submitLabel="Save Changes"
              />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}