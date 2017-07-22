import React,{Component} from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import Swiper from 'swiper';
import 'swiper/dist//css/swiper.min.css';

import '../css/slider.css';

class subSliderNav extends Component{

    render(){

        return this.props.sliderArr?(
            <div className="swiper-container">
                <div className="swiper-wrapper">
                     {
                        this.props.sliderArr.map(function(item,index){
                            return (
                                <div className="swiper-slide">
                                    <img src={item.imageUrl} alt=""/>
                                </div>
                                )
                        })
                    } 
                </div>
            </div>
        ) : <div>疯狂加载中...</div>
    }

    componentDidMount(){
        var that = this;
        $.get('http://localhost:8080/lunbo',function(res){ 
            console.log(JSON.parse(res).data.billboards);
            that.props.getSliderArr(JSON.parse(res).data.billboards);
            console.log(that.props.sliderArr);
            var mySwiper = new Swiper('.swiper-container',{
                direction: 'horizontal',
                autoplay:3000
            })
        })
    }
}

var SliderNav = connect(function(state,Ownprops){
    return {
        sliderArr: state.sliderArr
    }
},{
    getSliderArr: function(arr){
        
        return {
            type: 'GET_SLIDER',
            sliderArr: arr
        }
    }
})(subSliderNav);

export default SliderNav;