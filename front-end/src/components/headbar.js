import React,{ Component } from 'react';
import {connect} from 'react-redux';
import '../css/headbar.css';

class Headbar extends Component{

    render(){
        return (
            <div className="head-bar">
                <div className="head-left">
                    <i className="iconfont">&#xe601;</i>
                </div>
                <div className="head-title">卖座电影</div>
                <div className="head-right">
                    <div className="head-city">
                        <span>深圳</span>
                        <i className="iconfont">&#xe63a;</i>
                    </div>
                    <div className="head-user">
                        <i className="iconfont">&#xe788;</i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Headbar;