import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../authentication/firebase";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);

  const REACT_APP_TMDB_KEY = 'b41e38a110d56e861987601ac78202ce'
  const REACT_APP_BASE_URL = 'https://api.themoviedb.org/3'

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    // const {data: { results },} = await axios.get(`${REACT_APP_BASE_URL}/${type}/movie/`, {
    //   params: {
    //     api_key: REACT_APP_TMDB_KEY,
    //     query: searchKey,
    //   },
    // });
    const tmdbInstance = await axios.create({
      baseURL: REACT_APP_BASE_URL,
      params: {
        // TODO: Jangan lupa masukkan API_KEY yang benarnya di sini yah !
        api_key: REACT_APP_TMDB_KEY,
        query: searchKey,
      },
    }).get(`/${type}/movie/`)
    setMovies(tmdbInstance.data.results);
    await selectMovie(tmdbInstance.data.results[0]);
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(
      `${REACT_APP_BASE_URL}/movie/${id}`,
      {
        params: {
          api_key: REACT_APP_TMDB_KEY,
          append_to_response: "videos",
        },
      }
    );

    return data;
  };

  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await fetchMovie(movie.id);
    setSelectedMovie(data);
  };

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key

    return (
      <YouTube
        containerClassName={"youtube-container"}
        opts={{ width: "100%", height: "530px",playerVars:{autoplay:1, controls:0} }}
        videoId={key}
        
      />
    );
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const navigate = useNavigate()
  const [user,isLoading] = useAuthState(auth)

  useEffect(() => {
    if(isLoading){
      return;
    }
    if(!user){
      navigate('/login')
    }
  },[user,isLoading,navigate])

  return (
    <div className="home">
      <Navbar searchMove={fetchMovies} />
      <Featured
        type="movie"
        poster={selectedMovie}
        trailer={renderTrailer}
        playTrailer={playTrailer}
        setPlayTrailer={setPlayTrailer}
      />
      <List movie={movies} pilihMovie={selectMovie} />
      <List movie={movies} pilihMovie={selectMovie} />
    </div>
  );
};

export default Home;
