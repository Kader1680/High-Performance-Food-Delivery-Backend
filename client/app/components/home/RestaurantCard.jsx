import Link from "next/link";
import { Star, Clock } from "lucide-react";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
    >
      <div className="relative h-40 w-full">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {restaurant.is_featured && (
          <span className="absolute top-3 left-3 bg-[#EE5F2B] text-white text-xs font-semibold px-2 py-1 rounded-lg">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-500" />
            {restaurant.rating}
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine_type}</p>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          {restaurant.delivery_time} • ${restaurant.delivery_fee} delivery
        </div>
      </div>
    </Link>
  );
}