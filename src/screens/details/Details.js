import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from "../../common/header/Header";
import './Details.css'
import YouTube from 'react-youtube';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { makeStyles } from "@material-ui/styles";
import '../../common/stylesheet/common.css'


function Details(props) {
  const [movieDetail, setMovieDetail] = useState({})
  const [genres, setGenres] = useState([])
  const [artists, setArtists] = useState([])
  const [youtubeUrl, setYoutubeUrl] = useState("")

  const [starIcons, setStarIcons] = useState([{
    id: 1,
    stateId: "star1",
    color: "black"
  },

  {
    id: 2,
    stateId: "star2",
    color: "black"
  },
  {
    id: 3,
    stateId: "star3",
    color: "black"
  },
  {
    id: 4,
    stateId: "star4",
    color: "black"
  },

  {
    id: 5,
    stateId: "star5",
    color: "black"
  }]);

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
        setArtists(response.artists)
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
    height: "270",
    width: '100%',
    playerVars: {
      autoplay: 0,
      origin: "http://localhost:3000",
    },
  };

  const starClickHandler = (id) => {
    let starIconList = [];
    
    for (let star of starIcons) {
      let starNode = star;
      if (star.id <= id) {
        starNode.color = "yellow"
      }
      else {
        starNode.color = "black";

      }
      starIconList.push(starNode);
    }
    setStarIcons(starIconList);
  }

  const useStyles = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
      width: 300,
      height: 350,
    },
  });

  const classes = useStyles();

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
          <img src={movieDetail.poster_url} alt={movieDetail.title} width='226px' height='326px'/>
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

        <div className='ratio-20' style={{marginRight:'16px'}}>
          <Typography>
            <b>Rate this movie: </b>
            <div className="star-container">
              {
                starIcons.map(star => (
                  <StarBorderIcon
                    className={star.color}
                    key={"star" + star.id}
                    onClick={() => starClickHandler(star.id)}
                  />
                ))
              }
            </div>
          </Typography>

          <div className='artists-heading'>
            <Typography>
              <b>Artists: </b>
            </Typography>
          </div>
          <div>
            <GridList cellHeight={180} className={classes.gridList}>
              {artists ? (
                artists.map((artist) => (
                  <GridListTile key={artist.id}>
                    <img src={artist.profile_url} alt={artist.first_name} />
                    <GridListTileBar
                      title={artist.first_name + " " + artist.last_name}
                    />
                  </GridListTile>
                ))
              ) : (
                <h6>No artists data available</h6>
              )}
            </GridList>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Details;
