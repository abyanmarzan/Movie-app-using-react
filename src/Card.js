import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, overview, path }) => {
    return (
        <div className="card bg-base-100 w-full sm:w-96 shadow-xl mx-auto">
            <figure className="px-4 pt-4 sm:px-10 sm:pt-10">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${path}`}
                    alt={name}
                    className="w-full h-auto rounded-lg"
                />
            </figure>
            <div className="card-body items-center text-center p-4">
                <h2 className="card-title text-lg sm:text-xl">{name}</h2>
                <p className="text-sm sm:text-base line-clamp-3">{overview}</p>
                <div className="card-actions mt-4">
                    <Link
                        to={`/details/${id}`}
                        className="btn btn-primary text-sm sm:text-base"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
