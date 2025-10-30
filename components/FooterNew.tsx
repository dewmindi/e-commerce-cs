import React from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaArrowRight, FaTiktok } from 'react-icons/fa';

const FooterNew = () => {
  return (
    <footer className="bg-[#333333] text-gray-300  py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-16">

        {/* Top Section: Contact Info & Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 py-4"> {/* Changed pb-8 to py-4 */}
          {/* Phone Number */}
          <div className="flex items-center text-center md:text-left mb-4 md:mb-0"> {/* Reduced mb-6 to mb-4 */}
            <div className="bg-gray-700 rounded-full p-2 mr-3"> {/* Reduced p-3 to p-2 and mr-4 to mr-3 */}
              <FaPhone className="text-white text-lg" /> {/* Reduced text-xl to text-lg for icons */}
            </div>
            <div>
              <p className="text-xs">Need Help ?</p> {/* Reduced text-sm to text-xs */}
              <p className="text-base font-semibold text-white">+61 405 455 273</p> {/* Reduced text-lg to text-base */}
            </div>
          </div>

          {/* Logo */}
          <div className="mb-4 md:mb-0"> {/* Reduced mb-6 to mb-4 */}
            <img
              src="/cs-logo.png" // **IMPORTANT: Adjust this path if your logo is elsewhere**
              alt="CS Graphic Meta Logo"
              height="150" // Reduced height and width
              width="100"
              className="mx-auto" // Adjust height if needed
            />
          </div>

          {/* Email Address */}
          <div className="flex items-center text-center md:text-right">
            <div className="bg-gray-700 rounded-full p-2 mr-3"> {/* Reduced p-3 to p-2 and mr-4 to mr-3 */}
              <FaEnvelope className="text-white text-lg" /> {/* Reduced text-xl to text-lg for icons */}
            </div>
            <div>
              <p className="text-start text-xs">Email Address</p> {/* Reduced text-sm to text-xs */}
              <p className="text-base font-semibold text-white">info@csgraphicmeta.com.au</p> {/* Reduced text-lg to text-base */}
            </div>
          </div>
        </div>

        {/* Middle Section: About, Quick Links, Services, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Our Top Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Logo Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Card Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Letter Head Media Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Label Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Leaflet Design</a></li>
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About Company</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Creative Design Solutions For Australian Businesses. Transforming Brands With Powerful Visual Identities.<br></br>
              <span className='text-xs'>ABN74850076948</span>
            </p>

            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1EDpwtJDV3/?mibextid=wwXIfr" className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors">
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a href="https://www.instagram.com/csgraphicmeta/profilecard/?igsh=MWRiODZheW83cTZqbA==" className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors">
                <FaInstagram className="text-white text-lg" />
              </a>
              <a href="https://www.linkedin.com/company/cs-graphic-meta-version/" className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors">
                <FaLinkedinIn className="text-white text-lg" />
              </a>
              <a href="https://www.tiktok.com/@cs.graphic.meta?_t=ZS-8xbwKygCSO8&_r=1" className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors">
                <FaTiktok className="text-white text-lg" />
              </a>
              <a href="https://www.tiktok.com/@cs.graphic.meta?_t=ZS-8xbwKygCSO8&_r=1" className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors">
                <FaYoutube className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Link</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>



          {/* Newsletters */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Newsletters</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Stay Informed With Our Latest Updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-grow p-3 rounded-l-lg bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bf9d38fc]"
              />
              <button className="bg-[#bb8d03fc] p-3 rounded-r-lg hover:bg-[#bf9d38fc] transition-colors">
                <FaArrowRight className="text-white text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 pb-4 border-t border-gray-700">
          <p className="text-gray-500 text-sm">
            Copyright &copy; 2025 All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default FooterNew;
