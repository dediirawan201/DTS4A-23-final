import './listItem.scss'
import MoviePopular from '../../assets/img/MoviePopular.png'
import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const ListItem = ({index,film,pilihMovi}) => {
  const REACT_APP_IMG_URL = 'https://image.tmdb.org/t/p/w500'
  const [isHovered, setIsHovered] = useState(false)

   return (
    <div className='listItem'
    onClick={() => pilihMovi(film)}
    style={{left: isHovered && index * 225 - 50 + index * 2.5}}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >

          <img  src={`${REACT_APP_IMG_URL}/${film.poster_path}`} alt=''/>
        {isHovered && (
          <>
        <video src={film.video} autoPlay={true} loop/>
        <div className='itemInfo'>
          <div className='icons'>
            <PlayArrow className='icon'/>
            <Add className='icon'/>
            <ThumbUpAltOutlined className='icon'/>
            <ThumbDownOutlined className='icon'/>
          </div>
          <div className='itemInfoTop'>
            <span>1 hour 14 min</span>
            <span className='limit'>{film.adult}</span>
            <span>{film.release_date}</span>
          </div>
          <div className='desc'>
           {film.overview}
          </div>
          <div className='genre'>{film.Type}</div>
        </div>
        </>
      )}
    </div>
  )
}

export default ListItem;