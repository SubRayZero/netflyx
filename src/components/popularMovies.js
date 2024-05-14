import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./movies.css";

export default function ListMovies() {
    const [popularMovies, setPopularMovies] = useState(null);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
                    }
                });
                const jsonData = await response.json();
                setPopularMovies(jsonData.results);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        };
        fetchPopularMovies();
    }, []);

    return (
        <div className='home_size_carousel'>
            <div className='home_carousel'>
            <h3>Most popular</h3>
                {popularMovies ? (
                    <Carousel>
                        {popularMovies.reduce((chunks, movie, index) => {
                            if (index % 4 === 0) {
                                chunks.push([]);
                            }
                            chunks[chunks.length - 1].push(movie);
                            return chunks;
                        }, []).map((chunk, chunkIndex) => (
                            <Carousel.Item key={chunkIndex}>
                                <div className="row justify-content-center">
                                    {chunk.map(movie => (
                                        <div className="col-lg-3 col-md-6 mb-4" key={movie.id}>
                                            <Card style={{ width: '100%' }} className='heigh_card'>
                                                <Card.Img variant="top" className="popular_image"
                                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                                    alt={movie.title} />
                                                <Card.Body>
                                                    <Card.Title>{movie.title}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p>Chargement...</p>
                )}
            </div>
        </div>
    );
}
