import axios from 'axios';
import {useEffect, useState} from "react";
import Movie from "./Movie"
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';


export default function Row({title, fetchURL, rowID}) {
    const [isHovering, setIsHovering] = useState(false);
    const [isNotHovering, setIsNotHovering] = useState(true);
    const [isLoading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])

    let rows = document.querySelectorAll('.row')

    const handleMouseEnter = () => {
        setIsHovering(true)
        setIsNotHovering(false)
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setIsNotHovering(true)
    };

    const indexOfRows = () => {
        let index = 0;
        for (let row of rows) {
            let IdOfThis = row.closest('.row').getAttribute('id')
            if (row.attributes[0].nodeValue === IdOfThis) {
                index++
                return index
            }
        }
    };

    useEffect(() => {
        setLoading(true)
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
        setLoading(false)
        // window.addEventListener('mouseover', indexOfRows)
        // console.log(e.target.parentNode.parentNode.getAttribute('id'));

    }, [fetchURL])


    const slideRight = () => {
        const slider = document.getElementById("slider" + rowID)
        slider.scrollLeft += 500;
    }
    const slideLeft = () => {
        const slider = document.getElementById("slider" + rowID)
        slider.scrollLeft -= 500;
    }

    return (
        <div className="mt-10 last:mb-10">
            <h2 className="pl-12 text-3xl mb-2 font-bold">{title}</h2>
            <div className="relative group">
                <div id={"slider" + rowID}
                     className="row flex gap-[8px] whitespace-nowrap overflow-x-scroll scrollbar-hide [&>svg]:hover:opacity-70 hover:[&>div]:hover:opacity-100 [&>div]:hover:opacity-30"
                     onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                    {isLoading ? (
                        <div className="w-full h-full bg-grey">

                        </div>
                    ) : (
                        movies.map((item, id) => (
                            <Movie keys={id} item={item}/>
                        ))
                    )}
                    <div
                        className={`absolute w-full h-full bg-gradient-to-r from-slate-900 to-slate-900 opacity-30 hidden ${!isHovering ? 'hidden' : 'block '} ${!isNotHovering ? 'hidden' : 'block opacity-100'}`}>
                    </div>
                </div>
                <MdChevronLeft onClick={slideLeft}
                               className="fill-slate-800 bg-white left-[.5%] rounded-full top-[40%] absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                               size="30"/>
                <MdChevronRight onClick={slideRight}
                                className="fill-slate-800 bg-white right-[.5%] rounded-full top-[40%] absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                                size="30"/>
            </div>
        </div>
    )
}