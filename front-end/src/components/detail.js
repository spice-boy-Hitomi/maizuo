import React,{Component} from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import '../css/detail.css';

class subDetail extends Component{

    constructor(props){
        super(props);
        console.log(props.match.params.id);
    }
    render(){
        return this.props.detail?(
            <div className="detail-wrapper">
                <div className="detail-img"><img src={this.props.detail.cover.origin} alt=""/></div>
                <div className="detail-txt">
                    <h2>影片简介</h2>
                    <div>导　　演 : <span>{this.props.detail.director}</span></div>
                    <div>主　　演 : {
                        this.props.detail.actors.map(function(item,index){
                            return <span className="actor">{item.name}</span>
                            })
                        }</div>
                    <div>地区语言 : <span>{this.props.detail.nation}({this.props.detail.language})</span></div>
                    <div>类　　型 : <span>{this.props.detail.category}</span></div>
                    <div>上映日期 : <span>{new Date(this.props.detail.premiereAt).getMonth() + 1}月{new Date(this.props.detail.premiereAt).getDate()}日上映</span></div>
                    <p>{this.props.detail.synopsis}</p>
                </div>
                <a className="buynow" href="javascript:;">立即购票</a>
            </div>
        ): <div>加载中...</div>
    }

    componentDidMount(){
        var that = this;
        var id = this.props.match.params.id;
        $.get('http://localhost:8080/detail',{ id:id },function(res){
            that.props.getDetail(JSON.parse(res).data.film);
            console.log(that.props.detail);
        })
    }
}

var Detail = connect(function(state,Ownprops){
    return {
        detail: state.detail
    }
},{
    getDetail: function(data){
        return {
            type: 'GET_DETAIL',
            detail: data
        }
    }
})(subDetail);

export default Detail;