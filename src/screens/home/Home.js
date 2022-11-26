import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import './Home.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const Home = () => {
    return (
        <div>
            <Header />
            <div id='upcoming-movies-heading-container'>
                <div id='upcoming-movies-heading'>
                    Upcoming Movies
                </div>
            </div>
            <div id='upcoming-movies'>
                <UpcomingMovies />
            </div>
            <div id="released-movies-and-filter-container">
                <div className="released-movies grid-76 margin-16">
                    <ReleasedMovies />
                </div>
                <div className="movie-filter grid-24 margin-16">
                    Hello
                </div>
            </div>
        </div>
    )
}

export function UpcomingMovies() {
    const [upcomingMovies, setUpcomingMovies] = useState([])

    useEffect(() => {
        getUpcomingMovies()
    }, [])

    // Make an api call for get published/upcoming movies
    const getUpcomingMovies = async () => {
        try {
            const status = 'PUBLISHED'; // Published == Upcoming
            // Will return 6 upcoming movies as I set limit to 6 (as per requirement)
            const rawResponse = await fetch(`http://localhost:8085/api/v1/movies?status=${status}&limit=6`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Accept": "application/json;charset=UTF-8",
                },
            })

            const response = await rawResponse.json()

            if (rawResponse.ok) {
                setUpcomingMovies(response.movies);
            } else {
                throw (new Error(response.message || 'Something went wrong!'))
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    return (
        <ImageList
            rowHeight={250}
            sx={{
                gridAutoFlow: "column",
                gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
                gridAutoColumns: "minmax(250px, 1fr)",
                margin: 'auto',
                overflowY: 'hidden'
            }}>
            {
                upcomingMovies.map((movie) => (
                    <ImageListItem key={movie.id}>
                        <img src={movie.poster_url} />
                        <ImageListItemBar title={movie.title} />
                    </ImageListItem>
                ))
            }
        </ImageList>
    )
}

export function ReleasedMovies() {
    const [releasedMovies, setReleasedMovies] = useState([])

    useEffect(() => {
        getReleasedMovies()
    }, [])

    // Make an api call for get released movies
    const getReleasedMovies = async () => {
        try {
            const status = 'RELEASED';
        
            const rawResponse = await fetch(`http://localhost:8085/api/v1/movies?status=${status}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Accept": "application/json;charset=UTF-8",
                },
            })

            const response = await rawResponse.json()

            if (rawResponse.ok) {
                setReleasedMovies(response.movies);
            } else {
                throw (new Error(response.message || 'Something went wrong!'))
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    return (
        <ImageList
            rowHeight={350}
            cols={4}
            sx={{overflow:'hidden',margin:'auto'}}
            gap={10}
            >
            {
                releasedMovies.map((movie) => (
                    <ImageListItem key={movie.id}>
                        <img src={movie.poster_url}  />
                        <ImageListItemBar title={movie.title} subtitle={`Released Date : ${movie.release_date}`} />
                    </ImageListItem>
                ))
            }
        </ImageList>
    )
}

export default Home;