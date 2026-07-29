"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/home/HeroSection";
import CuisineFilter from "./components/home/CuisineFilter";
import RestaurantCard from "./components/home/RestaurantCard";

// Fake data — replace with a real API call later
const FAKE_RESTAURANTS = [
  { id: 1, name: "Pizza Palace", cuisine_type: "Pizza", rating: 4.7, delivery_time: "25-35 min", delivery_fee: 2, is_featured: true, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
  { id: 2, name: "Burger House", cuisine_type: "Burgers", rating: 4.5, delivery_time: "20-30 min", delivery_fee: 1.5, is_featured: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
  { id: 3, name: "Sushi Zen", cuisine_type: "Sushi", rating: 4.8, delivery_time: "30-40 min", delivery_fee: 3, is_featured: true, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500" },
  { id: 4, name: "Pasta Bella", cuisine_type: "Italian", rating: 4.4, delivery_time: "25-35 min", delivery_fee: 2, is_featured: false, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500" },
  { id: 5, name: "Dragon Wok", cuisine_type: "Chinese", rating: 4.3, delivery_time: "20-30 min", delivery_fee: 1, is_featured: false, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" },
  { id: 6, name: "Taco Fiesta", cuisine_type: "Mexican", rating: 4.6, delivery_time: "15-25 min", delivery_fee: 1.5, is_featured: false, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500" },
  { id: 7, name: "Sweet Tooth", cuisine_type: "Desserts", rating: 4.9, delivery_time: "20-30 min", delivery_fee: 2, is_featured: false, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500" },
  { id: 8, name: "Napoli Pizza", cuisine_type: "Pizza", rating: 4.2, delivery_time: "30-40 min", delivery_fee: 2.5, is_featured: false, image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500" },
];

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    // Simulate an API call
    const timer = setTimeout(() => {
      const data = selectedCuisine
        ? FAKE_RESTAURANTS.filter((r) => r.cuisine_type === selectedCuisine)
        : FAKE_RESTAURANTS;
      setRestaurants(data);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedCuisine]);

  const featured = restaurants.filter((r) => r.is_featured);
  const all = restaurants;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={cartCount} onCartClick={() => alert("Cart clicked")} />

      <main className="flex-1 pb-20">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mt-10">
            <CuisineFilter selected={selectedCuisine} onSelect={setSelectedCuisine} />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#EE5F2B]" />
            </div>
          ) : (
            <>
              {!selectedCuisine && featured.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-bold text-2xl mb-6 text-gray-900">Featured Restaurants</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((r) => (
                      <RestaurantCard key={r.id} restaurant={r} />
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-10">
                <h2 className="font-bold text-2xl mb-6 text-gray-900">
                  {selectedCuisine ? `${selectedCuisine} Restaurants` : "All Restaurants"}
                </h2>
                {all.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-3">🍽️</p>
                    <p className="font-semibold text-lg">No restaurants found</p>
                    <p className="text-gray-500 text-sm mt-1">Try a different cuisine filter</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {all.map((r) => (
                      <RestaurantCard key={r.id} restaurant={r} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}