import React,{Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class subNow extends Component{

    render(){
        return this.props.movieNowArr?(
            <div>
                <ul>
                    {
                        this.props.movieNowArr.map(function(item,index){
                            return (
                                <li className="film-item">
                                    <Link to={'/detail/' + item.id}>
                                        <div className="item-left"><img src={item.poster.thumbnail}alt=""/></div>
                                        <div className="item-right">
                                            <div className="title">
                                                <h2>{item.name}</h2>
                                                <span>{item.grade}</span>
                                            </div>
                                            <p>{item.intro}</p>
                                            <div className="item-info"><span>{item.cinemaCount}</span>家影院上映<span>{item.watchCount}</span>人购票</div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                        
                    }
                </ul>
            </div>
        ): <div>疯狂加载中...</div>
    }

    componentDidMount(){
        var that = this;
        $.get('http://localhost:8080/movie/now',function(res){
            console.log(JSON.parse(res).data.films);
            that.props.getMovieNowArr(JSON.parse(res).data.films);
            console.log(that.props.nowArr);
        })
    }
}

var Now = connect(function(state,Ownprops){
    return {
        movieNowArr: state.movieNowArr
    }
},{
    getMovieNowArr: function(arr){
        return {
            type: 'GET_MOVIE_NOW',
            movieNowArr: arr
        }
    }
})(subNow);

export default Now;