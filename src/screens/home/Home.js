import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import './Home.css';
import { makeStyles } from "@mui/styles";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const Home = () => {
    return (
        <div>
            <Header />
            <div id='upcoming-movies-container'>
                <div id='upcoming-movies-heading'>
                    Upcoming Movies
                </div>
            </div>
            <div>
                <UpcomingMovies />
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

export default Home;