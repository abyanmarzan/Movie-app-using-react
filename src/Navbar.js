import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="flex-none">
                    <button
                        className="btn btn-square btn-ghost lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Navbar Items */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                        <a className="btn btn-ghost text-xl px-8 lg:px-20">MovieApp</a>
                        <a className="btn btn-ghost text-xl" href="/">Home</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;


