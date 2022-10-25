import React, { useState } from 'react'
import './navbar.scss'
import Movie from '../../assets/img/movies.png'
import Profile from '../../assets/img/ProfileIMG.png';
import SearchIcon from '@mui/icons-material/Search';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ArrowDropDown } from '@mui/icons-material';
import { keluarAplikasi } from '../../authentication/firebase';
import { Navigate } from 'react-router-dom';

const Navbar = ({searchMove}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchKey,setSearchKey] = useState('')

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll === null)
  }

  const searchMovies = (e) => {
    e.preventDefault()
    searchMove(searchKey)
  }

  const buttonLogout = () => {
    keluarAplikasi();
    Navigate('/login')
  }
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="container">
            <div className="left">
                <img src={Movie} alt=''/>
                <span>Home</span>
                <span>Series</span>
                <span>Movies</span>
                <span>New And Popular</span>
                <span>My List</span>
            </div>
            <div className="right">
                
                <form onSubmit={searchMovies}>
                  <input type='text' onChange={e => setSearchKey(e.target.value)}/>
                  <button type='submit'><SearchIcon type='submit' className='Searchicon'/></button>
                </form>
                <span>Dedi</span>
                <CardGiftcardIcon className='icon'/>
                <NotificationsIcon className='icon'/>
                <img src={Profile} alt=''/>
                <div className="profile">
                <ArrowDropDown className='icon'/>
                <div className="options">
                  <span>Settings</span>
                  <span onClick={buttonLogout}>Logout</span>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar