import React, { useState, useEffect, useRef } from 'react'
import playbutton from '../Assets/icons/play_arrow.svg'
import shufflebutton from '../Assets/icons/shuffle.svg'
import skipnextbutton from '../Assets/icons/skip_next.svg'
import skippreviousbutton from '../Assets/icons/skip_previous.svg'
import graphiceq from '../Assets/icons/graphic_eq.svg'
import heavyOnMyHeart from '../Assets/images/image4.jpg'
import './Player.css'


function Player() {
  const [songs, setSongs] = useState([])
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(60)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    fetch('https://songs-fyem.onrender.com/songs')
      .then((response) => response.json())
      .then((data) => {
        setSongs(data)
      })
      .catch((error) => console.error('Error fetching songs:', error));
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

 
  const handleTimeUpdate = () => {
    setAudioProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    )
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  }

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setAudioProgress(0)
    setIsPlaying(true)
  }    
  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setAudioProgress(0)
    setIsPlaying(true)
  };
  
  function handleMusicProgress (e) {
    const progress = e.target.value
   setAudioProgress(progress)
   audioRef.currentTime = (progress / 100) * audioRef.current.duration
}

if (songs.length === 0) return <p>Loading...</p>;

  const currentSong = songs[currentSongIndex];

  return (
    <div className='music-container'>
      <p className='musicPlayer'>Music Player</p>
      <p className='music-Head-Name'>{currentSong.title}</p>
      <p className='music-Artist-Name'>{currentSong.artist}</p>
      <img src={heavyOnMyHeart} alt='image' className='heavyOnMyHeart'/>
      <div className='music-Timer'>
        <p className='musicCurrentTime'>
          {audioRef.current && !isNaN(audioRef.current.currentTime) 
          ? new Date(audioRef.current.currentTime * 1000).toISOString().substr(14, 5) 
          : "00:00"}</p>
        <p className='musicEndTime'>
        {audioRef.current && !isNaN(audioRef.current.currentTime) 
      ? new Date(audioRef.current.currentTime * 1000).toISOString().substr(14, 5) 
      : "03:00"}
        </p>
      </div>
      <input type='range' name='musicProgressBar' className='music-Progress-Bar' value={audioProgress} onChange={handleMusicProgress}/>
      <div className='musicIcons'>
        <img src={shufflebutton} alt='shuffle' onClick={() => console.log('Shuffle')} />
        <img src={skippreviousbutton} alt='previous' onClick={prevSong} />
        <img src={playbutton} alt='playbutton' className='playButton' onClick={togglePlayPause} style={{ filter: isPlaying ? "brightness(0.5)" : "none"}}  />
        <img src={skipnextbutton} alt='next' onClick={nextSong} />
        <img src={graphiceq} alt='equalizer'/>
      </div>

      <audio
      ref={audioRef}
      src={currentSong.audio}
      onTimeUpdate={handleTimeUpdate}
      onEnded={nextSong}
      />
    </div>
  )
}

export default Player
