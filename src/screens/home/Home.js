import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import './Home.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import FilterCard from "./FilterCard";
import '../../common/stylesheet/common.css'
import { Link } from 'react-router-dom';

const Home = (props) => {
    // Store filter param object to filter in filterParam state
    const [filterParam, setFilterParam] = useState({
        'title': '',
        'genres': '',
        'artists': '',
        'startDate': '',
        'endDate': ''
    });

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
                    <ReleasedMovies filterParam={filterParam} history={props.history} />
                </div>
                <div className="movie-filter grid-24 margin-16">
                    <FilterCard setFilterParam={setFilterParam} />
                </div>
            </div>
        </div>
    )
}

/**
 * Function responsible for rendering upcoming movies from the API
 * @returns return upcoming movies 
 */
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
            {upcomingMovies ?
                upcomingMovies.map((movie) => (
                    <ImageListItem key={movie.id}>
                        <img src={movie.poster_url} alt={movie.title} />
                        <ImageListItemBar title={movie.title} />
                    </ImageListItem>
                ))

                : <h6>No upcoming movies data available</h6>
            }
        </ImageList>
    )
}


/**
 * Function responsible for rendering released movies from the API
 * @param {*} props 
 * @returns Released Movies
 */
export function ReleasedMovies(props) {
    const [releasedMovies, setReleasedMovies] = useState([])
    const { title, genres, artists, startDate, endDate } = props.filterParam;

    useEffect(() => {
        getReleasedMovies()
    }, [props.filterParam])

    // Make an api call for get released movies
    const getReleasedMovies = async () => {
        try {
            const status = 'RELEASED';
            const url = `http://localhost:8085/api/v1/movies?status=${status}&title=${title}&start_date=${startDate}&end_date=${endDate}&genre=${genres}&artists=${artists}`

            const rawResponse = await fetch(url, {
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
            sx={{ overflow: 'hidden', margin: 'auto' }}
            gap={10}
        >
            {releasedMovies ?
                releasedMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <ImageListItem key={movie.id} className='back'>
                            <img src={movie.poster_url} alt={movie.title} />
                            <ImageListItemBar title={movie.title} subtitle={`Released Date : ${movie.release_date}`} />
                        </ImageListItem>
                    </Link>
                ))

                :

                <h6>No released movies data available</h6>
            }
        </ImageList>
    )
}

export default Home;