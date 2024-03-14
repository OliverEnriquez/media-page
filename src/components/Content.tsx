import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Content: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All categories");
    const [items, setItems] = useState<MediaData[]>([]);

    interface MovieData {
        idMovie: number;
        movieName: string;
        movieGender: string;
        rate: number;
        urlImage: string;
    }

    interface VideoGameMedia {
        idVideoGame: number;
        videoGameName: string;
        videoGameGender: string;
        rate: number;
        urlImage: string;
    }

    interface MediaData {
        id: number;
        name: string;
        gender: string
        rate: number;
        urlImage: string;
        category: string;
    }

    useEffect(() => {
        getAllItems();

    }, []);

    const getAllItems = () => {
        const medias: MediaData[] = [];


        // Fetch video games first
        fetch("http://64.23.194.88:8080/api/videogame")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((videoGameData: VideoGameMedia[]) => {
                const videoGames = videoGameData.map((item: VideoGameMedia) => ({
                    id: item.idVideoGame,
                    name: item.videoGameName,
                    gender: item.videoGameGender,
                    rate: item.rate,
                    urlImage: item.urlImage,
                    category: 'Gaming' // Adding a type field to distinguish between movies and video games
                }));
                medias.push(...videoGames); // Adding video games to the 'medias' array

                // Fetch movies after video games are fetched and processed
                fetch("http://64.23.194.88:8080/api/movie")
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((movieData: MovieData[]) => {
                        const movies = movieData.map((item: MovieData) => ({
                            id: item.idMovie,
                            name: item.movieName,
                            gender: item.movieGender,
                            rate: item.rate,
                            urlImage: item.urlImage,
                            category: 'Movies' // Adding a type field to distinguish between movies and video games
                        }));
                        medias.push(...movies); // Adding movies to the 'medias' array
                        shuffleArray(medias); // Shuffle the 'medias' array
                        setItems(medias);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const handleCategoryChange = (category: string) => {
        const medias: MediaData[] = [];
        if (category === 'movie') {
            fetch("http://64.23.194.88:8080/api/" + category)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: MovieData[]) => { // Specify the type of 'data' as MovieData[]
                    const medias = data.map((item: MovieData) => ({ // Specify the type of 'item' as MovieData
                        id: item.idMovie,
                        name: item.movieName,
                        gender: item.movieGender,
                        rate: item.rate,
                        urlImage: item.urlImage,
                        category: 'Movies',
                    }));
                    setItems(medias);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else if (category === 'videogame') {
            fetch("http://64.23.194.88:8080/api/videogame")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: VideoGameMedia[]) => { // Specify the type of 'data' as MovieData[]
                    const medias = data.map((item: VideoGameMedia) => ({ // Specify the type of 'item' as MovieData
                        id: item.idVideoGame,
                        name: item.videoGameName,
                        gender: item.videoGameGender,
                        rate: item.rate,
                        urlImage: item.urlImage,
                        category: 'Gaming',
                    }));
                    setItems(medias);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

        } else {
            getAllItems();
        }
        setSelectedCategory(category);
    };

    const getClipPath = (fraction: number) => {
        const percent = fraction * 100;
        return `polygon(${percent}% 0%, 50% 50%, ${percent}% 100%, 0% 100%, 0% 0%)`;
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                <button type="button"
                    className={selectedCategory === "All categories"
                        ? "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
                        : "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"}
                    onClick={() => handleCategoryChange("All categories")}>
                    All categories
                </button>
                <button type="button"
                    className={selectedCategory === "movie"
                        ? "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
                        : "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"}
                    onClick={() => handleCategoryChange("movie")}>
                    Movies
                </button>
                <button type="button"
                    className={selectedCategory === "videogame"
                        ? "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
                        : "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"}
                    onClick={() => handleCategoryChange("videogame")}>
                    Gaming
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item: MediaData) => (
                    <div key={item.id} className='image-container animate-fadeIn'>
                        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div className="flex flex-col items-center"> {/* Flex direction column */}
                                <img className="h-auto max-w-full rounded-lg mb-4" src={item.urlImage} alt="" style={{ width: '300px', height: '300px' }} /> {/* Moved mb-4 class to the image */}
                                <div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">{item.gender}</p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Category: {item.category}</p>


                                    <div className="flex items-center">
                                        {/* Aquí se muestra la clasificación utilizando el componente Rate */}
                                        <div className="flex items-center">
                                            {[...Array(Math.floor(item.rate))].map((_, index) => (
                                                <svg key={index} className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                            {item.rate % 1 !== 0 &&
                                                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" style={{ clipPath: getClipPath(item.rate % 1) }} />
                                                </svg>
                                            }
                                            {[...Array(5 - Math.ceil(item.rate))].map((_, index) => (
                                                <svg key={index} className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        {/* Fin de la clasificación */}
                                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{item.rate.toFixed(1)} out of 5</p>
                                    </div>

                                </div>
                            </div>
                        </a>
                    </div>
                ))}


            </div>
        </div>
    );

}

export default Content;