import React from 'react';
import { MapPin, Phone, Clock, Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#6a4c69] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/lalalulogo.png" 
              alt="Lalalu Skin & Laser" 
              className="h-[5rem] w-auto mb-4"
            />
            <p className="text-gray-300 mb-4 max-w-md">
              Your destination for professional skin care and laser treatments. 
              We provide a relaxing environment where you can rejuvenate and renew your skin.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/lalaluskinlaser/" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Nolan Hill, NW<br />
                  Calgary, Alberta
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">(403) 607-1443</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">info@lalaluskinlaser.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="text-gray-300">
                <p>Monday - Friday</p>
                <p className="font-medium">11:00 AM - 7:00 PM</p>
                <p>Saturday - Sunday</p>
                <p className="font-medium">12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="bg-gradient-to-r from-[#d2b9e3] to-[#b7a0c7] rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-6">Special Offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-center">
              <div>
                <p className="font-semibold text-base mb-1">BOGO 20% Off</p>
                <p>Buy one service, get the second 20% off</p>
              </div>
              <div>
                <p className="font-semibold text-base mb-1">B2GO 50% Off</p>
                <p>Buy two services, get the third 50% off</p>
              </div>
              <div>
                <p className="font-semibold text-base mb-1">B3GO Free</p>
                <p>Buy three services, get the fourth one free</p>
              </div>
              <div>
                <p className="font-semibold text-base mb-1">Free Add-On</p>
                <p>Add Dermaplaning or Cupping to any facial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-grey-300">
          <p>&copy; 2026 Lalalu Skin & Laser. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;