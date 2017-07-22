import React, { Component } from 'react';
import { Accordion, List } from 'antd-mobile';
import { connect } from 'react-redux';

import $ from 'jquery';
import '../css/cinema.css';

class subCinema extends Component {

    onChange = (key) => {
        console.log(key);
    }
    render() {
        return this.props.cinemaArr?(
            
            <div style={{ marginTop: 0, marginBottom: 0 }}>
                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange} openAnimation={{}}>
                    {
                        this.props.cinemaArr.map(function(item,index){
                            return (
                                <Accordion.Panel header={item.district}>
                                    <List className="my-list">
                                        {
                                            item.list.map(function(v,k){
                                                return (
                                                    <List.Item>
                                                        <div className="cinema-item-title">
                                                            <h2>{v.name}</h2>
                                                            <span>座</span>
                                                            <span>通</span>
                                                        </div>
                                                        <div className="cinema-item-tag">
                                                            <span>可乐爆米花</span>
                                                            <span>优惠活动</span>
                                                        </div>
                                                        <p className="cinema-position">{v.address}</p>
                                                        <p className="cinema-distance">距离未知</p>
                                                        
                                                    </List.Item>
                                                )
                                            })
                                        }
                                    </List>
                                </Accordion.Panel>
                            )
                        })
                    }
                </Accordion>
            </div>
        ): <div></div>
    }

    componentDidMount() {
        var that = this;
        $.get('http://localhost:8080/cinema', function (res) {
            console.log(JSON.parse(res).data.cinemas);
            console.log(formatDisArr(JSON.parse(res).data.cinemas));
            that.props.getCinema(formatDisArr(JSON.parse(res).data.cinemas));
        })
    }
}

var Cinema = connect(function (state, Ownprops) {

    return {
        cinemaArr: state.cinemaArr
    }
}, {
        getCinema: function (data) {
            return {
                type: 'GET_CINEMA',
                cinemaArr: data
            }
        },
        setTitleCinema: function(){
            return {
                type: 'SET_TITLE_CINEMA',
                title: '全部影院'
            }
        }
})(subCinema);

function formatDisArr(arr){
    var disArr = [];
    var newArr = [];
    for(var i=0 ; i < arr.length; i++){
        if(disArr.indexOf(arr[i].district.name) == -1){
            disArr.push(arr[i].district.name);
            newArr.push({
                district: arr[i].district.name,
                list: []
            })
        }
    }
    for(var i = 0; i < arr.length ; i++){
        for(var j = 0; j < newArr.length ; j++){
            if( newArr[j].district == arr[i].district.name){
                newArr[j].list.push(arr[i]);
            }
        }
    }

    return newArr;
}


export default Cinema;