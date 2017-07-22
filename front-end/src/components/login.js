import React,{ Component } from 'react';
import $ from 'jquery';

import '../css/login.css';

class Login extends Component{

    state = {
        sendDisplay: 'none',
        message: ''
    }

    render(){
        
        return (
            <div className="login-form">
                    <div className="input-wrapper">
                        <input type="text" placeholder="输入手机号/邮箱" ref="phone" onChange={this.phoneChange.bind(this)}/>
                        <div className="input-bg"></div>
                        <div className="send-code" style={{display:this.state.sendDisplay}}><i className="iconfont">&#xe61f;</i>发送验证码</div>
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="输入密码/验证码" ref="password"/>
                        <div className="input-bg"></div>
                    </div>
                    <div className="wrong-msg" refs="msg">{this.state.message}</div>
                    <button type="submit" id="submit-btn" onClick={this.submitInfo.bind(this)} >登录</button>
            </div>
        )
    }

    submitInfo(){
        var pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[05-9])|(17[0-9]))\d{8}$/;
        var that = this;
        if(!pattern.test(this.refs.phone.value)){
            that.setState({
                message: '请输入正确手机号或邮箱'
            })
        }else{
            $.post('http://localhost:8080/users/login',{
                phone: that.refs.phone.value,
                password: that.refs.password.value
            },function(res){
                that.setState({
                message: res.msg  
                })
            if(res.msg == '账号注册成功!' || res.msg == '登录成功!'){
                setTimeout(function(){
                    window.location.href = 'http://localhost:3000/#/center';
                },500)
            }
                
            })
        }
    }
    phoneChange(){
        var pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[05-9])|(17[0-9]))\d{8}$/;
        if(pattern.test(this.refs.phone.value)){
            this.setState({
                sendDisplay: 'block'
            })
        }else{
            this.setState({
                sendDisplay: 'none'
            })
        }
        
    }
}

export default Login;