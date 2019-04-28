import React, {Component} from "react";
import {connect} from 'react-redux';
import axios from "axios";
import {Alert, Button, Modal, Form, FormGroup, FormControl} from 'react-bootstrap';
import {withRouter} from "react-router";
import './style.css';
import {Md5} from 'ts-md5';


const HOME_URL = '/';

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowModal: true,
        }


        this.hideModal = () => {
            this.setState({isShowModal: false});
            this.redirectToHome(HOME_URL);
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.isShowAlert = this.isShowAlert.bind(this);
    }

    //todo: will implement forward to page that view previously before login,
    //current direct to home page
    redirectToHome(HOME_URL) {
        console.log("redirect to home page");
        this.props.history.push(HOME_URL);
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
        const md5 = new Md5();
        let encryptPassword = md5.appendStr(event.target.value).end();
        console.log("Encrypt md5 value"+encryptPassword);
        this.setState({password: encryptPassword});
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
                            <FormGroup  controlId="form-password">
                                <Form.Label>Password</Form.Label>
                                <FormControl type="password" placeholder="Enter Password" onChange={this.onChangePassword}/>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer
                        className="login-moda-footer"
                    >
                        <Button
                            type="submit" variant="outline-primary" onClick={() => this.props.userLogin(this.state.username,this.state.password)}
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
        errorMsg: state.getIn(['login','errorMsg'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin(username, password) {
            console.log('!!!!!' + username + '!!!' + password);


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

                setValueByKeyToSessionStorage('username', originAxiosRes.username);
                setValueByKeyToSessionStorage('isLogined', originAxiosRes.isLogined);
                setValueByKeyToSessionStorage('authorities', originAxiosRes.authorities);

                console.log('dispatch user login action');
                dispatch(userLoginAction);
            }).catch((e) => {
                console.log(e);
                // this.props.errorMsg = e.toString();
            });
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));