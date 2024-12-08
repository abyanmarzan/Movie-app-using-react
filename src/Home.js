import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';

// Card Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const fetchMovies = (page) => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=${page}`
            )
            .then((response) => {
                setMovies(response.data.results);
                window.scroll(0, 0);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            navigate(`/search/${searchTerm}`);
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleNextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,  // Default to 3 slides for large screens
        slidesToScroll: 3, // Scroll 3 slides at a time
        responsive: [
            {
                breakpoint: 1024,  // Tablets and smaller
                settings: {
                    slidesToShow: 2,  // Show 2 slides
                    slidesToScroll: 2, // Scroll 2 slides at a time
                },
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,  
                    slidesToScroll: 1, 
                },
            },
            {
                breakpoint: 480,  
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1, 
                    arrows: false,
                },
            },
        ],
    };
    

    return (
        <div className="bg-base-50 min-h-screen">
            {/* Hero Section */}
            <div className="hero bg-base-100 min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]">
                <div className="hero-content flex flex-col sm:flex-row items-center text-left w-full px-4 sm:px-6 lg:px-10">
                    <div className="w-full max-w-2xl text-center sm:text-left sm:w-1/2">
                        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
                            Welcome to MovieApp
                        </h1>
                        <p className="py-4 text-base sm:text-xl">
                            Discover top-rated movies and explore your favorites effortlessly.
                        </p>
                        <div className="form-control mt-4 w-full sm:w-3/4 mx-auto sm:mx-0">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search for any movie"
                                className="input input-lg input-bordered w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleEnterKeyPress}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="btn btn-base-1000 btn-lg mt-8 w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Movies Slider Section */}
            <div className="container mx-auto px-4 py-6 mt-4">
                <div className="mb-4 pl-10 ml-4">
                    <h3 className="text-xl font-bold mb-4">Top Movies</h3>
                </div>
                <Slider {...settings}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="px-2">
                            <Card
                                id={movie.id}
                                name={movie.title}
                                overview={movie.overview}
                                path={movie.poster_path}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Pagination Section */}
            <div className="join w-full flex justify-center items-center px-4 py-6">
                <button
                    className="join-item btn btn-base-500"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                <span className="join-item btn cursor-default">Page {currentPage}</span>
                <button
                    className="join-item btn btn-base-500"
                    onClick={handleNextPage}
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default Home;

