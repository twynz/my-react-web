import React, {Component} from "react";
import {connect} from 'react-redux';
import axios from "axios";
import {Alert, Button, Modal, Form, FormGroup, FormControl} from 'react-bootstrap';
import {withRouter} from "react-router";
import './style.css';
import {GET_TOKEN} from "../../constant/urlConstant";
import qs from 'qs'

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowModal: true,
            errorMsg: null
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.isShowAlert = this.isShowAlert.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        let HOME_URL = '/';
        this.setState({isShowModal: false});
        this.redirectToHome(HOME_URL);
    }

    //todo: will implement forward to page that view previously before login,
    //current direct to home page
    redirectToHome(HOME_URL) {
        console.log('home url is' + HOME_URL);
        if (HOME_URL === null) {
            this.props.history.push('/');
        } else {
            this.props.history.push(HOME_URL)
        }
    }

    isShowAlert() {
        let errorMsg = this.props.errorMsg;
        if (errorMsg === null) {
            return null;
        } else {
            return (
                <Alert variant="danger">
                    {errorMsg}
                </Alert>);
        }
    }

    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    onChangePassword(event) {
        // const md5 = new Md5();
        // let encryptPassword = md5.appendStr(event.target.value).end();
        // console.log("Encrypt md5 value" + encryptPassword);
        // this.setState({password: encryptPassword});
        this.setState({password: event.target.value});
    }

    render() {

        const {isLogined} = this.props;
        console.log("is logined " + !isLogined);

        if (!isLogined) {
            console.log('>>>>' + isLogined);
            return (
                <Modal
                    show={this.state.isShowModal}
                    centered
                    onHide={this.hideModal}
                >
                    <Modal.Header
                        closeButton
                        className="login-moda"
                    >
                        <Modal.Title
                            className="login-moda-title"
                        >
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        className="login-moda-body"
                    >
                        {this.isShowAlert()}
                        <form>
                            <FormGroup controlId="form-username">
                                <Form.Label>Username</Form.Label>
                                <FormControl
                                    type="username" placeholder="Enter Username" onChange={this.onChangeUsername}/>
                            </FormGroup>
                            <FormGroup controlId="form-password">
                                <Form.Label>Password</Form.Label>
                                <FormControl type="password" placeholder="Enter Password"
                                             onChange={this.onChangePassword}/>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer
                        className="login-moda-footer"
                    >
                        <Button
                            type="submit" variant="outline-primary"
                            onClick={() => this.props.userLogin(this.state.username, this.state.password)}
                            className="ml-auto sign-in-button">
                            Sign In
                        </Button>
                        <Button variant="outline-danger" onClick={() => this.hideModal()}
                                className="mr-auto sign-out-button">
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            console.log('>>>>' + isLogined + "called!");
            this.redirectToHome(this.props.redirectPath);
            return null;
        }
    }
}


function setValueByKeyToSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

const mapStateToProps = (state) => {
    return {
        isLogined: state.getIn(['login', 'isLogined']),
        username: state.getIn(['login', 'username']),
        authorities: state.getIn(['login', 'authorities']),
        redirectPath: state.getIn(['login', 'previousPath']),
        errorMsg: state.getIn(['login', 'errorMsg'])
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        userLogin(username, password) {
            console.log('!!!!!' + username + '!!!' + password);
            const errorMsg = 'Error Username or Password!';
            let clientAuthorization = btoa('test:test');
            clientAuthorization = 'Basic ' + clientAuthorization;


            axios.post(GET_TOKEN, qs.stringify({
                grant_type: 'password',
                username: username,
                password: password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': clientAuthorization
                }
            }).then((res) => {
                console.log('return res' + res);
                //parse vars
                let originAxiosRes = res.data;
                if (originAxiosRes['access_token'] != null) {
                    const userLoginAction = {
                        type: 'userLoginAction',
                        access_token: originAxiosRes['access_token'],
                        isLogined: true,
                        username: username
                    };
                    dispatch(userLoginAction);
                } else {
                    const errorMsgAction = {
                        type: 'errorMsgAction',
                        errorMsg: errorMsg
                    };
                    dispatch(errorMsgAction);
                }


                // setValueByKeyToSessionStorage('username', originAxiosRes.username);
                // setValueByKeyToSessionStorage('isLogined', originAxiosRes.isLogined);
                // setValueByKeyToSessionStorage('authorities', originAxiosRes.authorities);
                //
                // console.log('dispatch user login action');

            }).catch((e) => {
                console.log(e);
                const errorMsgAction = {
                    type: 'errorMsgAction',
                    errorMsg: errorMsg
                };
                dispatch(errorMsgAction);
            });


            console.log('axios called!');
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
