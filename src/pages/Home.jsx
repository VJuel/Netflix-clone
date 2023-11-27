import Main from "../components/Main";
import Row from "../components/Row";
import {requests} from '../Request'

export default function Home() {

    return (
        <>
            <Main/>
            <Row rowID='1' className='row' title='Most Popular' fetchURL={requests.requestPopular}/>
            <Row rowID='2' className='row' title='Horror' fetchURL={requests.requestHorror}/>
            <Row rowID='3' className='row' title='Trending' fetchURL={requests.requestTrending}/>
            <Row rowID='4' className='row' title='Top Rated' fetchURL={requests.requestTopRated}/>
            <Row rowID='5' className='row' title='Up Coming' fetchURL={requests.requestUpComing}/>
        </>
    );
}
