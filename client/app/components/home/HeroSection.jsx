import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-[#EE5F2B] to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Hungry? We have got you covered.
        </h1>
        <p className="text-white/90 text-lg mb-8">
          Order food from the best local restaurants, delivered fast.
        </p>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            className="w-full h-14 pl-12 pr-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-white/30"
          />
        </div>
      </div>
    </div>
  );
}