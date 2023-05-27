import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../Axios'
import {imageUrl } from '../../constants/Constants'
function RowPost(props) {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    axios.get(props.url).then((res) => { setMovies(res.data.results) })
  }, [])
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {
          movies.map((movie)=>{
            return(
            <img className={props.isSmall ?'smallPosters':'poster'} src={`${movies ? imageUrl+movie.backdrop_path : ''}`} />
          )})
        }
      </div>

    </div>
  )
}

export default RowPost
