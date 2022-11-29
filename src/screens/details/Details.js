import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from "../../common/header/Header";
import './Details.css'
import YouTube from 'react-youtube';

function Details(props) {

  const [movieDetail, setMovieDetail] = useState({})

  const [genres, setGenres] = useState([])

  const [youtubeUrl, setYoutubeUrl] = useState("")


  useEffect(() => {
    getMovieDetail()
  }, [])


  const getMovieDetail = async () => {
    const movieId = props.match.params.id;
    try {
      const url = `http://localhost:8085/api/v1/movies/${movieId}`
      const rawResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Accept": "application/json;charset=UTF-8",
        },
      })

      const response = await rawResponse.json()

      if (rawResponse.ok) {
        setMovieDetail(response);
        setGenres(response.genres)
        setYoutubeUrl(response.trailer_url)
        console.log(response)
      } else {
        throw (new Error(response.message || 'Something went wrong!'))
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  }

  var releaseDate = new Date(movieDetail.release_date).toDateString();

  let youtubeId = youtubeUrl.split("=")[1];

  let opts = {
    height: "390",
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      origin: "http://localhost:3000",
    },
  };



  return (
    <div>
      <Header showBookNow={true} movieId={props.match.params.id} />
      <div className="back-container">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Typography>&#60; Back to Home</Typography>
        </Link>
      </div>
      <div className='detail-container'>
        <div className='image-container ratio-20'>
          <img src={movieDetail.poster_url} alt={movieDetail.title} />
        </div>
        <div className='ratio-60'>
          <Typography variant='headline' component='h2'>{movieDetail.title}</Typography>

          <Typography sx={{ marginTop: '5px' }}>
            <b>Genre: </b>
            {genres.map((genre) => `${genre}`).join(', ')}
          </Typography>

          <Typography sx={{ margin: 'auto' }}>
            <b>Duration: </b>
            {movieDetail.duration}
          </Typography>

          <Typography sx={{ margin: 'auto' }}>
            <b>Release Date: </b>
            {releaseDate}
          </Typography>

          <Typography sx={{ margin: 'auto' }}>
            <b>Rating: </b>
            {movieDetail.rating}
          </Typography>

          <Typography sx={{ marginTop: '16px' }}>
            <b>Plot: </b>
            (<a href={movieDetail.wiki_url} target='blank'>Wiki Link</a>)&nbsp;
            {movieDetail.storyline}
          </Typography>

          <Typography sx={{ marginTop: '16px' }}>
            <b>Youtube: </b>
            <YouTube
              videoId={youtubeId}
              opts={opts}
              onReady={(event) => {
                event.target.pauseVideo();
              }}
            />
          </Typography>

        </div>
        <div className='ratio-20'>
          HW
        </div>
      </div>
    </div>

  )
}

export default Details;
