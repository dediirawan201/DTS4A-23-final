import "./featured.scss";
import Poster from "../../assets/img/MoviePoster.png";
import PosterName from "../../assets/img/MovieName.png";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useState } from "react";
const Featured = ({ type, poster, trailer,playTrailer,setPlayTrailer }) => {
  const REACT_APP_IMGBACKDROP_URL = 'https://image.tmdb.org/t/p/w1280'
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
          </select>
        </div>
      )}
      {/* <img src={Poster} alt=''/> */}
      <div
        className="backdrop"
        style={{
          backgroundImage: `url('${REACT_APP_IMGBACKDROP_URL}${poster.backdrop_path}')`,
        }}
      >
        {playTrailer ? <button className={'button button--close'} onClick={() => setPlayTrailer(false)}>Close</button> : null}
        {poster.videos && playTrailer ? trailer() : null}
        <div className="info">
          <h1>{poster.title}</h1>
          <span className="desc">
            {poster.overview ? poster.overview : null}
          </span>
          <div className="buttons">
            <button className="play" onClick={() => setPlayTrailer(true)}>
              <PlayArrow />
              <span>Play</span>
            </button>
            <button className="more">
              <InfoOutlined />
              <span>More Information</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
