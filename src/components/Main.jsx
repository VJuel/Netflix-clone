import {useEffect, useState} from "react";
import axios from 'axios';
import {requests} from '../Request'

export default function Main() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results)
        })
    }, [])

    const movie = movies[Math.floor(Math.random() * movies.length)]

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    }

    return (
        <div className="w-full h-[800px] text-white">
            <div className="w-full h-full relative">
                <div className="absolute w-full h-full bg-gradient-to-r from-black"></div>
                <img className="object-cover max-h-full w-full h-full"
                     src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={`${movie?.title}`}/>
                <div
                    className="absolute top-1/2 md:left-[50px] md:max-w-lg left-[30px] md:max-w-2xl translate-y-[-30%]">
                    <div className="text-white text-2xl mb-3">{movie?.title}</div>
                    <div className="flex gap-[12px] mb-3">
                        <button className="btn bg-white min-w-fit text-black">Play</button>
                        <button className="btn btn-secondary bg-transparent border-2 border-white text-white">Watch
                            Later
                        </button>
                    </div>
                    <p className="text-gray-400">Realse in {movie?.release_date}</p>
                    <p className="text-white">Realse in {truncateString(movie?.overview, 150)}</p>
                </div>
            </div>
        </div>
    );
}
