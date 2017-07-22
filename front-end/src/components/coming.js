import React,{Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class subComing extends Component{

    render(){
        return this.props.movieComingArr?(
            <div>
                <ul>
                    {
                        this.props.movieComingArr.map(function(item,index){
                            return (
                                <li className="film-item">
                                    <Link to={'/detail/' + item.id}>
                                        <div className="item-left"><img src={item.poster.thumbnail}alt=""/></div>
                                        <div className="item-right">
                                            <div className="title">
                                                <h2>{item.name}</h2>
                                            </div>
                                            <p>{item.intro}</p>
                                            <div className="item-info-coming"><span>{new Date(item.premiereAt).getMonth() + 1}</span>月<span>{new Date(item.premiereAt).getDate()}</span>日上映<span>星期{formatDay(new Date(item.premiereAt).getDay())}</span></div>
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
        $.get('http://localhost:8080/movie/coming',function(res){
            console.log(JSON.parse(res).data.films);
            that.props.getMovieComingArr(JSON.parse(res).data.films);
            console.log(that.props.movieComingArr);
        })
    }
}

function formatDay(num){
    switch(num){
        case 1:
            return '一';
        case 2:
            return '二';
        case 3:
            return '三';
        case 4:
            return '四';
        case 5:
            return '五';
        case 6:
            return '六';
        case 0:
            return '日';
    }
}
var Coming = connect(function(state,Ownprops){
    return {
        movieComingArr: state.movieComingArr
    }
},{
    getMovieComingArr: function(arr){
        return {
            type: 'GET_MOVIE_COMING',
            movieComingArr: arr
        }
    }
})(subComing);

export default Coming;