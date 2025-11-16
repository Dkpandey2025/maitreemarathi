import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-50 text-gray-700 mt-10 border-t border-orange-200">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            Maitree Marathi
          </h3>
          <p className="text-sm leading-relaxed">
            Learn Marathi the fun and easy way! Interactive lessons, voice-based
            AI learning, and gamified challenges help you master the language
            naturally.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-orange-600 mb-2">
            Quick Links
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-orange-500 transition">
                Support
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-orange-500 transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-orange-600 mb-2">
            Connect With Us
          </h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="mailto:support@maitreemarathi.com"
              className="hover:text-orange-500 transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm py-3 bg-orange-100 text-gray-600">
        © {new Date().getFullYear()} Maitree Marathi. All rights reserved.
      </div>
    </footer>
  );
}
