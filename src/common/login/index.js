import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    LoginWrapper,
    LoginBox,
    Input,
    Button
} from './style';
import axios from "axios";


class Login extends Component {

    render() {
        console.log('render login component');
        let username ;
        let password;
        return (
            <LoginWrapper>
                <LoginBox>
                    <Input placeholder='账号' type='text' className='username' innerRef={(input) => {this.username = input}}/>
                    <Input placeholder='密码' type='password' className='passwd'innerRef={(input) => {this.password = input}}/>
                    <Button onClick={this.props.userLogin(this,username,password)}>提交</Button>
                </LoginBox>
            </LoginWrapper>

        );
    }


}

const mapStateToProps = (state) => {
    return {
        isLogined: state.getIn(['login', 'isLogined']),
        username: state.getIn(['login', 'username']),
        authorities: state.getIn(['login', 'authorities'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin(username, password) {
            let keyUsername = 'username';
            let keyPassword = 'password';
            let params = {};

            params[keyUsername]=username;
            params[keyPassword]=password;
            console.log('axios called!');
            axios.post("/api/userLogin",params).then((res) => {
                let originAxiosRes = res.data.data;
                let result = [];

                for (let i = 0; i < 5; i++) {
                    result.push(originAxiosRes[i]);
                }
                const getInfoListAction = {
                    type: 'getSearchInfoList',
                    data: result
                };
                dispatch(getInfoListAction);
            }).catch((e) => {
                console.log('error' + e);
            });
        },
        changeFocusedState(focused) {
            const changeFocused = {type: 'changeFocusedAction', focused: focused};
            dispatch(changeFocused);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);