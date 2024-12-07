import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieDetails = () => {
    const [details, setDetails] = useState({});
    const [recommend, setRecommend] = useState([]);
    const { id } = useParams();

    const renderGenre = () => {
        if (details.genres) {
            return details.genres.map((genre) => (
                <span key={genre.id} style={{ marginLeft: 8 }}>{genre.name}</span>
            ));
        }
    };

    const apiCall = (movieId) => {
        // Fetch movie details
        axios
            .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US`)
            .then((response) => {
                setDetails(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        // Fetch recommendations
        axios
            .get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1`)
            .then((response) => {
                setRecommend(response.data.results);
                window.scroll(0, 0);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        apiCall(id);
    }, [id]);

    let releaseDate = new Date(details.release_date);
    releaseDate = releaseDate.getFullYear();

    // Slider settings with responsive breakpoints
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024, // For tablets and small desktops
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768, // For mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row bg-base-100 shadow-xl overflow-hidden p-5">
                <div className="md:w-1/3">
                    <img
                        className="w-full h-auto object-cover"
                        src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                        alt={`${details.title} movie poster`}
                    />
                </div>
                <div className="md:w-2/3 p-6">
                    <h2 className="text-2xl font-bold mb-2">
                        {details.title} ({releaseDate})
                    </h2>
                    <p className="text-gray-700 mb-4">
                        {renderGenre()} • {details.runtime} mins
                    </p>
                    <h3 className="text-lg font-semibold">Rating: {details.vote_average}</h3>
                    <p className="italic text-gray-500 mt-2">{details.tagline}</p>
                    <h3 className="text-lg font-bold mt-4">Overview</h3>
                    <p className="text-gray-500 mb-4">
                        {details.overview}
                    </p>
                </div>
            </div>

            {/* Recommendations Section */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                    Similar to {details.title}
                </h3>
                <Slider {...sliderSettings}>
                    {recommend.slice(0, 6).map((movie) => (
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
        </div>
    );
};

export default MovieDetails;


