import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    LoginWrapper,
    LoginBox,
    Input,
    Button
} from './style';
import axios from "axios";

import {withRouter} from "react-router";


class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    //todo: will implement forward to page that view previously before login,
    //current direct to home page
    redirectToHome(HOME_URL) {
        console.log("redirect to home page");
        this.props.history.push(HOME_URL);
    }

    render() {

        const HOME_URL = '/';
        const {isLogined} = this.props;

        if (!isLogined) {
            console.log('>>>>'+isLogined);
            return (


                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder='账号' type='text' className='username' innerRef={(input) => {
                            this.account = input
                        }}/>
                        <Input placeholder='密码' type='password' className='passwd' innerRef={(input) => {
                            this.password = input
                        }}/>
                        <Button
                            onClick={() => this.props.userLogin(this.account, this.password)}>提交</Button>
                    </LoginBox>
                </LoginWrapper>

            );
        }else {
            console.log('>>>>'+isLogined);
            this.redirectToHome(this.props.redirectPath);
            return null;
        }
    }


}


function setValueByKeyToSessionStorage(key,value) {
    sessionStorage.setItem(key,value);
}

const mapStateToProps = (state) => {
    return {
        isLogined: state.getIn(['login', 'isLogined']),
        username: state.getIn(['login', 'username']),
        authorities: state.getIn(['login', 'authorities']),
        redirectPath: state.getIn(['login','previousPath'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin(username, password) {
            console.log('!!!!!' + username.value + '!!!' + password.value);

            let keyUsername = 'username';
            let keyPassword = 'password';

            const formData = new FormData();
            formData.set(keyUsername, username.value);
            formData.set(keyPassword, password.value);
            console.log('axios called!');
            axios({
                method: 'post',
                url: '/api/userLogin',
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            }).then((res) => {
                let originAxiosRes = res.data;

                const userLoginAction = {
                    type: 'userLoginAction',
                    username: originAxiosRes.username,
                    isLogined: originAxiosRes.isLogined,
                    data: originAxiosRes
                };

                setValueByKeyToSessionStorage('username',originAxiosRes.username);
                setValueByKeyToSessionStorage('isLogined',originAxiosRes.isLogined);
                setValueByKeyToSessionStorage('authorities', originAxiosRes.authorities);

                console.log('dispatch user login action');
                dispatch(userLoginAction);
            }).catch((e) => {
                console.log('error' + e);
            });
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));