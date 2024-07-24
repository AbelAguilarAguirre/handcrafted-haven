import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const current_year = new Date().getFullYear();
    return (
      <div id="section_footer" className="bg-gray-500 mt-4 mb-0 text-white w-full">
        <div className="flex py-4 justify-center space-x-4">
          <div className="flex justify-center items-center">
            <Link
              href="/about"
              className="btn btn-link hover:font-bold "
            >
              About
            </Link>
          </div>
          <span className="flex justify-center items-center">
            {" "}
            |{" "}
          </span>
          <div className="flex justify-center items-center">
            <Link
              href="/testimonial"
              className="btn btn-link hover:font-bold"
            >
              Testimonials
            </Link>
          </div>
          <span className="flex justify-center items-center">
            {" "}
            |{" "}
          </span>
          <div className="flex justify-center items-center">
            <Link
              href="mailto:"
              className="btn btn-link  hover:font-bold"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex pt-4 pb-8 justify-center space-x-4">
          <p className="text-center max-w-40 sm:max-w-60">
            1234 Happy Street, Rexburg, ID 83460, USA
          </p>
          <span className=""> | </span>
          <p className="text-center max-w-40 sm:max-w-60">{`© ${current_year} Handcrafted Haven / Group 6`}</p>
        </div>
      </div>
    );
}

