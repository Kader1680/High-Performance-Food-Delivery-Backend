"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Phone, MapPin, Loader2 } from "lucide-react";

const STATUS_STYLES = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  suspended: "bg-yellow-100 text-yellow-700",
  closed: "bg-red-100 text-red-600",
};

export default function RestaurantManageCard({ restaurant, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${restaurant.name}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await onDelete(restaurant.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[restaurant.status]}`}>
            {restaurant.status}
          </span>
          {!restaurant.is_open && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              Closed now
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">{restaurant.description}</p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> {restaurant.phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {restaurant.address}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/restaurants/${restaurant.id}/edit`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 border hover:bg-gray-50"
        >
          <Pencil className="w-4 h-4" /> Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-60"
        >
          {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Delete
        </button>
      </div>
    </div>
  );
}