import React,{Component} from 'react';
import {HashRouter as Router,Route,NavLink} from 'react-router-dom';
import Now from './now.js';
import Coming from './coming.js';


import '../css/movie.css';

class Movie extends Component{

    render(){
        return (
            <Router>
                <div className="movie-wrapper">
                    <div className="movie-nav">
                        <div><NavLink exact activeClassName="active-nav" to="/movie/now">正在热映</NavLink></div>
                        <div><NavLink activeClassName="active-nav" to="/movie/coming">即将上映</NavLink></div>
                    </div>
                    {/* <Route exact path="/movie/" component={Now}/> */}
                    <Route path="/movie/now" component={Now}/>
                    <Route path="/movie/coming" component={Coming}/>
                </div>
            </Router>
        )
    }
}


export default Movie;