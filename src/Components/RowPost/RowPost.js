import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../Axios'
import { imageUrl, API_KEY } from '../../constants/Constants'
import YouTube from 'react-youtube'
function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')

  useEffect(() => {
    axios.get(props.url).then((res) => { setMovies(res.data.results) })
  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handilMovie = (id) => {
    // console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
      if (res.data.results.length !== 0) {
        setUrlId(res.data.results[0])
      } else {
        console.log('array is empty');
      }

    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {
          movies.map((movie) => {
            return (
              <img onClick={() => handilMovie(movie.id)} className={props.isSmall ? 'smallPosters' : 'poster'} src={`${movies ? imageUrl + movie.backdrop_path : ''}`} />
            )
          })
        }
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}

    </div>
  )
}

export default RowPost
