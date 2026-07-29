import Link from "next/link";
// import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#EE5F2B] flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-white">Foodie</span>
          </div>
          <p className="text-sm text-gray-400">
            Delicious food delivered fast, from your favorite local restaurants.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#EE5F2B] transition-colors">
              {/* <Facebook className="w-4 h-4" /> */}
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#EE5F2B] transition-colors">
              {/* <Instagram className="w-4 h-4" /> */}
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#EE5F2B] transition-colors">
              {/* <Twitter className="w-4 h-4" /> */}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#EE5F2B]">Home</Link></li>
            <li><Link href="/orders" className="hover:text-[#EE5F2B]">Orders</Link></li>
            <li><Link href="/tracking" className="hover:text-[#EE5F2B]">Tracking</Link></li>
            <li><Link href="/profile" className="hover:text-[#EE5F2B]">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#EE5F2B]">About Us</a></li>
            <li><a href="#" className="hover:text-[#EE5F2B]">Careers</a></li>
            <li><a href="#" className="hover:text-[#EE5F2B]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#EE5F2B]">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              {/* <MapPin className="w-4 h-4 text-[#EE5F2B]" /> */}
              123 Food Street, Oran, Algeria
            </li>
            <li className="flex items-center gap-2">
              {/* <Phone className="w-4 h-4 text-[#EE5F2B]" /> */}
              +213 555 123 456
            </li>
            <li className="flex items-center gap-2">
              {/* <Mail className="w-4 h-4 text-[#EE5F2B]" /> */}
              support@foodie.com
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Foodie. All rights reserved.
      </div>
    </footer>
  );
}