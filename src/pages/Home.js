import React, { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import MoviesItem from '../components/MoviesItem';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';


const Home = () => {
    const API_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=ef32645a58fd6506e28924ca1e4c975e&language=en-US&page=1";
    const API_TOPRATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=ef32645a58fd6506e28924ca1e4c975e&language=en-US&page=1";
    const API_TVSHOWS = "https://api.themoviedb.org/3/tv/popular?api_key=ef32645a58fd6506e28924ca1e4c975e&language=en-US&page=1";

    const [popular, setPopular] = useState([]);
    const [toprated, setTopRated] = useState([]);
    const [tvshow, setTvShows] = useState([]);
    
    const [width, setWidth] = useState(0);
    const carousel= useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    function fetcher(api, setter){
        fetch(api)
        .then((response) => response.json())
        .then((data) => setter(data.results));
    }
    
    fetcher(API_POPULAR, setPopular);
    fetcher(API_TOPRATED, setTopRated);
    fetcher(API_TVSHOWS, setTvShows);

    const renderMoviesList = (list) => (
        list.map((movie) => <MoviesItem key={movie.id} movie={movie} /> )
    );

    return (
        <div className='home'>
            <Hero/>
            <div className='home__lists'>
                <div className="home__list">
                    <div className="list__carousel">
                        <h2>Popular</h2>
                        <motion.div ref={carousel} className='main__carousel' whileTap={{cursor: "grabbing"}}>
                            <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className='inner__carousel'>
                                {renderMoviesList(popular)}
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="list__carousel">
                        <h2>Top Rated</h2>
                        <motion.div ref={carousel} className='main__carousel' whileTap={{cursor: "grabbing"}}>
                            <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className='inner__carousel'>
                                {renderMoviesList(toprated)}
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="list__carousel">
                        <h2>Most popular series</h2>
                        <motion.div ref={carousel} className='main__carousel' whileTap={{cursor: "grabbing"}}>
                            <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className='inner__carousel'>
                                {renderMoviesList(tvshow)}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;