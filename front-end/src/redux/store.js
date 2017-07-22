import { createStore } from 'redux';
import reducer from './reducer.js';

var state={
    title: '卖座电影',
    barArr: [ {path:'/',txt:'首页',title: '卖座电影'}, {path:'/movie/now',txt:'影片',title: '全部电影'},{path:'/cinema',txt:'影院',title: '全部影院'} ,{path:'/',txt:'商城',title: '卖座商城'} ,{path:'/',txt:'演出',title: '全部演'} ,{path:'/login',txt:'我的',title: '登录'}, {path:'/',txt:'卖座卡',title: '卖座卡'} ]
    
};

var store = createStore(reducer,state);

store.createAction = function(action){

    store.dispatch(action);
}

export default store;