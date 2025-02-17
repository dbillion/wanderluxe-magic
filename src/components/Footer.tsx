
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">WanderLuxe</h3>
            <p className="text-gray-600 text-sm">
              Your trusted partner for seamless travel experiences and visa services.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/tickets" className="text-gray-600 hover:text-primary">Flight Booking</Link></li>
              <li><Link to="/visa/student" className="text-gray-600 hover:text-primary">Student Visa</Link></li>
              <li><Link to="/visa/business" className="text-gray-600 hover:text-primary">Business Visa</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 hover:text-primary">Travel Blog</Link></li>
              <li><Link to="/planner" className="text-gray-600 hover:text-primary">Trip Planner</Link></li>
              <li><Link to="/deals" className="text-gray-600 hover:text-primary">Best Deals</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>contact@wanderluxe.com</span>
            </div>
            <p className="text-gray-600 text-sm">
              123 Travel Street<br />
              Adventure City, AC 12345
            </p>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} WanderLuxe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
