import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, overview, path }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${path}`}
                    alt={name}
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{overview}</p>
                <div className="card-actions">
                    <Link to={`/details/${id}`} className="btn info-content">
                        View details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
