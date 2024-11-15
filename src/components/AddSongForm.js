import React, { useState, useEffect } from 'react'
import background from '../Assets/Videos/video1.mp4'
import Search from './Search';
import './AddSongForm.css'

function AddSongForm() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    audio: '',
  });

  const [editingSong, setEditingSong] = useState(null)
  useEffect(() => {
    fetch('https://songs-fyem.onrender.com/songs')
      .then((resp) => resp.json())
      .then((data) => {
        setSongs(data)
        setFilteredSongs(data)
      })
      .catch((err) => console.error('Error fetching songs:', err));
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSong({
      ...newSong,
      [name]: value
    })
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSong) {
      
      fetch(`https://songs-fyem.onrender.com/songs/${editingSong.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      })
        .then((resp) => resp.json())
        .then((updatedSong) => {
          setSongs(songs.map((song) => (song.id === updatedSong.id ? updatedSong : song)))
          setEditingSong(null)
          setNewSong({ title: '', artist: '', audio: '' })
        })
        .catch((err) => console.error('Error updating song:', err))
    } else {
    
      fetch('https://songs-fyem.onrender.com/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      })
        .then((resp) => resp.json())
        .then((addedSong) => {
          setSongs([...songs, addedSong])
          setNewSong({ title: '', artist: '', audio: '' })
        })
        .catch((err) => console.error('Error adding song:', err))
    }
  };

  
  const handleDelete = (id) => {
    fetch(`https://songs-fyem.onrender.com/songs/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setSongs(songs.filter((song) => song.id !== id))
      })
      .catch((error) => console.error('Error deleting song:', error))
  };

  
  const handleEdit = (song) => {
    setEditingSong(song);
    setNewSong(song);
  };


  return (
    <div>
        <video src={background} autoPlay muted loop className='backgroundVideo'></video>
        <Search setFilteredSongs={setFilteredSongs} />
      <h2>{editingSong ? 'Edit Song' : 'Add New Song'}</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <input
          type="text"
          name="title"
          value={newSong.title}
          onChange={handleChange}
          placeholder="Song Title"
          required
        />
        <input
          type="text"
          name="artist"
          value={newSong.artist}
          onChange={handleChange}
          placeholder="Artist Name"
          required
        />
        <input
          type="text"
          name="audio"
          value={newSong.audio}
          onChange={handleChange}
          placeholder="Audio URL"
          required
        />
        <button type="submit">{editingSong ? 'Update Song' : 'Add Song'}</button>
      </form>

      <h3>Existing Songs</h3>
      <ul className='songslist'>
        {filteredSongs.map((song) => (
          <li key={song.id}>
            <p>
              <strong>{song.title}</strong> by {song.artist}
            </p>
            <button onClick={() => handleEdit(song)} className='editbtn'>Edit</button>
            <button onClick={() => handleDelete(song.id)} className='deletebtn'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddSongForm;
