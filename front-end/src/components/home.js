import React,{Component} from 'react';
import SliderNav from './slidernav.js';
import $ from 'jquery';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '../css/common.css';
import '../css/home.css';


class subHome extends Component{

    render(){
        return this.props.nowArr&&this.props.comingArr?(
            <div>
                <SliderNav />
                <div className="now">
                    <ul>
                        {
                            this.props.nowArr.map(function(item,index){
                                return (
                                    <li className="movie-item">
                                        <Link to={'/detail/'+item.id}>
                                            <img src={item.cover.origin} alt=""/>
                                            <div className="movie-info">
                                                <div className="info-left">
                                                    <h3>{item.name}</h3>
                                                    <p><span>{item.cinemaCount}</span>家影院上映<span>{item.watchCount}</span>人购票</p>
                                                </div>
                                                <div className="info-right">
                                                    <span>{item.grade}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <a className="more" href="javascript:;">更多热映电影</a>
                </div>
                <div className="coming">
                    <div className="divide-line">
                        <div>即将上映</div>
                    </div>
                    <ul>
                        {
                            this.props.comingArr.map(function(item,index){
                                return (
                                    <li className="movie-item">
                                        <Link to={'/detail/'+item.id}>
                                            <img src={item.cover.origin} alt=""/>
                                            <div className="movie-info">
                                                <div className="info-left">
                                                    <h3>{item.name}</h3>
                                                    <p><span>{item.cinemaCount}</span>家影院上映<span>{item.watchCount}</span>人购票</p>
                                                </div>
                                                <div className="info-right">
                                                    <span>{item.grade}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <a className="more" href="javascript:;">更多即将上映电影</a>
                </div>
            </div>
        ): <div></div>
    }

    componentDidMount(){
        var that = this;
        $.get('http://localhost:8080/now',function(res){ 
            console.log(JSON.parse(res).data.films);
            that.props.getNowArr(JSON.parse(res).data.films);
            console.log(that.props.nowArr);
            
        })
        $.get('http://localhost:8080/coming',function(res){ 
            console.log(JSON.parse(res).data.films);
            that.props.getComingArr(JSON.parse(res).data.films);
            console.log(that.props.comingArr);
            
        })
    }
}

var Home = connect(function(state,Ownprops){
    return {
        nowArr: state.nowArr,
        comingArr: state.comingArr
    }
},{
    getNowArr: function(arr){
        
        return {
            type: 'GET_NOW',
            nowArr: arr
        }
    },
    getComingArr: function(arr){
        return {
            type: 'GET_COMING',
            comingArr: arr
        }
    }
})(subHome);

export default Home;