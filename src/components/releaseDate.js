import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import "./popularMovies.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ReleaseDate() {
    const [ReleaseDateMovies, setReleaseDateMovies] = useState([]);

    useEffect(() => {
        const fetchReleaseDateMovies = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
                    }
                });
                const jsonData = await response.json();
                setReleaseDateMovies(jsonData.results);
            } catch (error) {
                console.error('Error fetching upcoming movies:', error);
            }
        };
        fetchReleaseDateMovies();
    }, []);

    return (
        <div className='home_size_carousel'>
        <div className='home_carousel'>
            <h3>List of movies</h3>
            {ReleaseDateMovies ? (
                <Carousel>
                    {ReleaseDateMovies.map(movie => (
                        <Carousel.Item key={movie.id}>
                            <Link href={"/movies/" + movie.id}>
                                <img
                                    className="d-block w-100 popular_image"
                                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    alt={movie.title}
                                />
                                <Carousel.Caption>
                                    <h3>{movie.title}</h3>
                                    <p>Release Date: {movie.release_date}</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>



    );
}



