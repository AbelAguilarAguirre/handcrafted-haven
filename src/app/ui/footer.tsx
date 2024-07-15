import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const current_year = new Date().getFullYear();
    return (
      <div id="section_footer" className="bg-white">
        <div className="flex py-4 justify-center space-x-4">
          <div className="flex justify-center items-center">
            <Link
              href="/about"
              className="btn btn-link text-gray-600 hover:font-bold hover:text-gray-800"
            >
              About
            </Link>
          </div>
          <span className="text-gray-400 flex justify-center items-center">
            {" "}
            |{" "}
          </span>
          <div className="flex justify-center items-center">
            <Link
              href="/testimonial"
              className="btn btn-link text-gray-600 hover:font-bold hover:text-gray-800"
            >
              Testimonials
            </Link>
          </div>
          <span className="text-gray-400 flex justify-center items-center">
            {" "}
            |{" "}
          </span>
          <div className="flex justify-center items-center">
            <Link
              href="mailto:Julie<jlcrowther@byui.edu>"
              className="btn btn-link text-gray-600 hover:font-bold hover:text-gray-800"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex py-2 mb-4 justify-center space-x-4">
          <p className="text-gray-600 text-center max-w-40 sm:max-w-60">
            1234 Happy Street, Rexburg, ID 83460, USA
          </p>
          <span className="text-gray-400"> | </span>
          <p className="text-gray-600 text-center max-w-40 sm:max-w-60">{`© ${current_year} Handcrafted Haven / Group 6`}</p>
        </div>
      </div>
    );
}

