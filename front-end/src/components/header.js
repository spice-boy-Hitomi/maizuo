import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Drawer, List, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import {HashRouter as Router,Route} from 'react-router-dom';
import Home from './home.js';
import Movie from './movie.js';
import Cinema from './cinema.js';
import Detail from './detail.js';
import Login from './login.js';
import Center from './center.js';

import '../css/header.css';
import '../css/iconfont.css';

class subHeader extends Component {


    state = {
        open: false,
        title: '卖座电影',
        backDisplay: 'none'
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }
    
    render() {
        var that = this;
        var barArr = this.props.barArr;
        const sidebar = (<List>
            {barArr.map((item, index) => {
                return (<List.Item key={index}
                ><NavLink to={item.path} onClick={function(){
                    that.setState({ open: !that.state.open ,title: item.title})
                }}>{item.txt}<i className="iconfont">&#xe600;</i></NavLink></List.Item>);
            })}
        </List>);

        return (
        <Router>
            <div>
                 <NavBar iconName={''} leftContent={<i className="iconfont">&#xe601;</i>} rightContent={[
                    <div className="navbar-city">
                         <span>深圳</span>
                         <i className="iconfont">&#xe63a;</i>
                     </div>,
                     <div className="navbar-user"><i className="iconfont">&#xe788;</i></div>
                 ]  } onLeftClick={this.onOpenChange}>{this.state.title}</NavBar> 
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight - 200 }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                    touch={false}
                >
                    
                    <Route exact path="/" component={Home} />
                    <Route path="/movie/" component={Movie} />
                    <Route path="/cinema" component={Cinema}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/center" component={Center} />
                    <div className="back-top"><i className="iconfont">&#xe648;</i></div>
                    
                </Drawer>
            </div>
        </Router>
        );
    }
    scrollAction(){
        console.log(this.refs.scrollBox.scrollTop);
    }
}

var Header = connect(function(state,Ownprops){
    return {
        title: state.title,
        barArr: state.barArr
    }
})(subHeader);



export default Header;