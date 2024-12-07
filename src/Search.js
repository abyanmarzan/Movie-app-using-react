import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from './Card';

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [term, setTerm] = useState("");
    const { term: searchTerm } = useParams();

    useEffect(() => {
        // Hit the search API
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=${searchTerm}`
            )
            .then((response) => {
                setMovies(response.data.results);
                setTerm(searchTerm);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [searchTerm]);

    // Slider settings with responsive breakpoints
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024, // Tablets and small desktops
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768, // Mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto px-4">
            <div className="mb-4 p-6">
                <h3 className="text-lg font-bold">Search Results: {term}</h3>
            </div>

            {/* Slider Component */}
            <Slider {...sliderSettings}>
                {movies.map((movie) => (
                    <div key={movie.id} className=" grid grid-cols-1 px-4">
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
    );
};

export default Search;


