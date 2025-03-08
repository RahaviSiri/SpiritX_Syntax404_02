import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white p-10">
      {/* Footer Sections */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-left">
        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">About Us</h3>
          <p className="text-sm">
            At MoraSpirit11, we provide an exciting fantasy cricket experience for cricket enthusiasts. Join the fun, build your dream team, and compete to become the ultimate cricket strategist!
          </p>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
          <ul className="text-sm space-y-3">
            <li>Email: <a href="mailto:support@moraspirit11.com" className="text-purple-400 hover:underline">support@moraspirit11.com</a></li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Fantasy Lane, Sports City, USA</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="text-sm space-y-3">
            <li><a href="/about" className="text-purple-400 hover:underline">About Us</a></li>
            <li><a href="/contact" className="text-purple-400 hover:underline">Contact Us</a></li>
            <li><a href="/privacy-policy" className="text-purple-400 hover:underline">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="text-purple-400 hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white text-2xl">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white text-2xl">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white text-2xl">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white text-2xl">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Information */}
      <div className="mt-12 border-t border-gray-600 pt-6 text-center">
        <p className="text-sm">&copy; 2025 MoraSpirit11 Fantasy League. All rights reserved.</p>
      </div>
    </footer>
  );
}
