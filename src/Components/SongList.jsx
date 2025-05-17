import { useRef } from 'react';
import './SongList.css';

{/* AntiDote */}
import AntiDote from '../assets/AntiDote.jpeg';
import Music_AntiDote from '../music/ANTIDOTE-yt.savetube.me.mp3';

{/* Jhol */}
import Jhol from '../assets/Jhol.jpeg';
import Music_Jhol from'../music/Jhol _ Coke Studio Pakistan _ Season 15 _ Maanu x Annural Khalid-yt.savetube.me.mp3';


const songs = [
    {
        title: "Antidote",
        artist: "Karan Aujla",
        image : AntiDote,
        audio : Music_AntiDote
    },
    {
        title: "Jhol",
        artist: "Maanu",
        image : Jhol,
        audio : Music_Jhol
    },


];


const SongList = () => {
    const audioRef = useRef(new Audio());

    const handlePlay = (src) => {
        if (audioRef.current.src !== src) {
            audioRef.current.src = src;
        }
        audioRef.current.play();
    };

    return (
        <div id="box">
            {songs.map((song, index) => (
                <div className="song" key={index}>
                    <img
                        src={song.image}
                        alt={song.title}
                        onClick={() => handlePlay(song.audio)}
                    />
                    <p>
                        {song.title}<br />{song.artist}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SongList;