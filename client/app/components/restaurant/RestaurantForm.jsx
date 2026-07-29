"use client";

import { useState } from "react";
import { Store, Phone, MapPin, FileText, Loader2 } from "lucide-react";

const STATUS_OPTIONS = ["active", "inactive", "suspended", "closed"];

export default function RestaurantForm({ initialData, onSubmit, submitLabel = "Create Restaurant" }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    status: initialData?.status || "active",
    is_open: initialData?.is_open ?? true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
      )}

      <div>
        <label className="block mb-2 text-sm font-medium">Restaurant Name</label>
        <div className="relative">
          <Store className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. Pizza Palace"
            value={form.name}
            onChange={handleChange("name")}
            className="w-full h-12 border rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#EE5F2B]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Description</label>
        <div className="relative">
          <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <textarea
            placeholder="Tell customers about your restaurant..."
            value={form.description}
            onChange={handleChange("description")}
            rows={3}
            className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#EE5F2B] resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              placeholder="+213 555 123 456"
              value={form.phone}
              onChange={handleChange("phone")}
              className="w-full h-12 border rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#EE5F2B]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Status</label>
          <select
            value={form.status}
            onChange={handleChange("status")}
            className="w-full h-12 border rounded-lg px-4 outline-none focus:ring-2 focus:ring-[#EE5F2B] bg-white"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="123 Food Street, Oran"
            value={form.address}
            onChange={handleChange("address")}
            className="w-full h-12 border rounded-lg pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#EE5F2B]"
            required
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_open}
          onChange={handleChange("is_open")}
          className="w-4 h-4 accent-[#EE5F2B]"
        />
        <span className="text-sm font-medium">Currently open for orders</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-[#EE5F2B] text-white rounded-lg font-semibold hover:bg-orange-600 flex items-center justify-center disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : submitLabel}
      </button>
    </form>
  );
}