import {useState} from "react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {UserAuth} from '../context/AuthContext'
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

export default function Movie({item, id, isHoveringImg, isNotHovering}) {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const {user} = UserAuth()

    const movieID = doc(db, 'user', `${user?.email}`)

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path
                })
            })
        } else {
            alert('Please log in to save a movie')
        }
    }

    return (
        <div className="w-[170px] h-[200px] shrink-0 relative transition-all delay-75 [&>div]:hover:block">
            <img
                className={`object-cover cursor-pointer w-full h-full block`}
                key={`${item.id} `}
                src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                alt={`${item.title}`}
                // onMouseLeave={handleMouseLeaveImg}
                // onMouseEnter={handleMouseEnterImg}
            />
            <div
                className="hidden cursor-pointer flex justify-center items-center absolute z-10 w-[101%] h-[101%] top-[50%] left-1/2 bg-black opacity-60 -translate-x-1/2 -translate-y-1/2">
                <p className="z-13 text-lg leading-5 font-semibold pt-[8rem] w-[80%] text-center m-auto whitespace-pre-wrap">{item?.title}</p>
                <p onClick={saveShow}>
                    {like ? (
                            <FaHeart
                                className={`absolute top-[5%] left-[8%] fill-white hover:scale-[105%]`}/>
                        )
                        : (
                            <FaRegHeart
                                className={`absolute top-[5%] left-[8%] fill-white hover:scale-[105%]`}/>
                        )}
                </p>
            </div>
        </div>

    )
}