import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import home from '../Assets/icons/home.svg'
import librarymusic from '../Assets/icons/library_music.svg'
import playlistadd from '../Assets/icons/playlist_add.svg'
import playarrow from '../Assets/icons/play_arrow.svg'
import addbtn from '../Assets/icons/add.svg'
import pause from '../Assets/icons/pause.svg'
import tunesettings from '../Assets/icons/tune_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import search from '../Assets/icons/search_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import './Sidebar.css'


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
 

    
  return (
  <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <ul className="sidebar-links">
        <li><Link to="/"><img src={home} alt='home'/></Link></li>
        <li><Link to="/add-song"><img src={search} alt='home'/></Link></li>
        <li><img src={librarymusic} alt='music library'/></li>
        <li><img src={playlistadd} alt='add playlist'/></li>
        <li><Link to="/add-song"><img src={addbtn} alt='add'/></Link> </li>
        <li><img src={playarrow} alt='play'/></li>
        <li><img src={pause} alt='pause'/></li>
        <li><img src={tunesettings} alt='tune settings'/></li>
      </ul>
    </div>
  )
}

export default Sidebar