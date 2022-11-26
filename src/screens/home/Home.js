import React from "react";
import Header from "../../common/header/Header";
import './Home.css';

const Home = () => {
    return (
        <div>
            <Header />
            <div id='upcoming-movies-container'>
                <div id='upcoming-movies-heading'>
                    Upcoming Movies
                </div>
            </div>
        </div>
    )
}

export default Home;