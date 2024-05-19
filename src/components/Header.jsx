import React, { useState } from 'react';
import logo from "../assets/Logo.png"
import { Link } from 'react-router-dom';
function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <Link to="/">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <img className="h-16 w-16" src={logo} alt="Logo" />
                        </div>
                    </div>
                    </Link>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden">
                    {/* <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</a>
                        <a href="#" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">About</a>
                        <a href="#" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Services</a>
                        <a href="#" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
                    </div> */}
                </div>
            )}
        </nav>
    );
}

export default Header;
