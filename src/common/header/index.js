/* eslint-disable */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';
import './styled.css';
import {Navbar, DropdownButton, NavDropdown, Dropdown, Nav, Button, ButtonGroup} from "react-bootstrap";
import iconSet from '../../statics/selection.json';
import IcomoonReact from 'icomoon-react';

const HOME_URL = '/';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    redirectToLogin(LOGIN_URL) {
        //console.log("redirect to login page");
        this.props.history.push(LOGIN_URL);
    }

    getLoginState(username, LOGIN_URL) {
        //console.log('getLogin status username is ' + username + (username != null));
        if (username === null && typeof username === "object") {
            return (
                <Button onClick={this.redirectToLogin.bind(this, LOGIN_URL)} className="loginButton">
                    Sign In
                </Button>
            );

        } else {
            return (
                <div style={{marginTop:"10px"}}>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="outline-warning">
                            Welcome, {username}
                        </Button>
                        <Dropdown.Toggle split id="dropdown-custom-2" variant="outline-warning"/>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={() => {
                                this.props.logoutAction();
                                this.redirectToHome(HOME_URL);
                            }}>Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>);
        }
    }

    redirectToHome(HOME_URL) {
        //console.log("redirect to home page");
        this.props.history.push(HOME_URL);
    }

    //todo will add register function
    render() {
        const {username} = this.props;
        //console.log('username is from props ' + username + "  " + username === "null");
        const LOGIN_URL = '/Login';
        return (
            <div className="div-header">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-bar-customize" style={{backgroundSize:"cover",zIndex:1040}}>
                    <Navbar.Brand href="/" className="navbrand">Wenyu In NZ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">
                            <IcomoonReact className="icon-cust" iconSet={iconSet} size={20} color="#f4f142"
                                          icon="home"/>
                            Home
                        </Nav.Link>
                        <Nav.Link href="/aboutMe">
                            <IcomoonReact className="icon-cust" iconSet={iconSet} size={20} color="white" icon="user"/>
                            About Me
                        </Nav.Link>
                        <Nav.Link href="/resume">
                            <IcomoonReact className="icon-cust" iconSet={iconSet} size={20} color="#a5c1ef"
                                          icon="profile"/>
                            My Resume
                        </Nav.Link>

                        <DropdownButton
                            title={
                                <span className="dropdowndiv">
                                   <IcomoonReact className="icon-cust" iconSet={iconSet} size={20} color="#7e968e"
                                                 icon="list"/>
                                    <b>Tech Details</b>
                                </span>
                            }
                            variant="outline-secondary"
                            className="drop-down-button"
                        >

                            <NavDropdown.Item className="dropdownItem" href={'/content/' + 'architecture'}>
                                    Architecture
                            </NavDropdown.Item>

                            <NavDropdown.Divider/>
                            <NavDropdown.Item className="dropdownItem" href={'/content/' + 'frontend'}>
                                    Front End
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdownItem" href={'/content/' + 'backend'}>
                                    Back End
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdownItem" href={'/content/' + 'devops'}>
                                    DevOps
                            </NavDropdown.Item>

                            <NavDropdown.Divider/>
                            <NavDropdown.Item className="dropdownItem" href={'/content/' + 'patents'}>
                                    My US patents
                            </NavDropdown.Item>

                        </DropdownButton>
                    </Nav>
                        <Nav className="ml-auto">

                            <Button href="/write" variant="danger" className="write-button">
                                <i className="iconfont">&#xe615;</i>
                                Write Article
                            </Button>
                            {this.getLoginState(username, LOGIN_URL)}
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('mapToState called');
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        username: state.getIn(['login', 'username']),
        frontEndArticleNames: state.getIn(['header', 'frontEndArticleNames'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleNames(category) {
            //console.log('axios called!');
            axios.get("/api/getArticleNames", {params: {type: category}}).then((res) => {
                let originAxiosRes = res.data.data;
                let result = [];
                let names = originAxiosRes.names;
                for (let i = 0; i < names.length; i++) {
                    result.push(originAxiosRes[i]);
                }
                const getArticleNamesByType = {
                    type: 'getArticleNames',
                    data: result,
                    category: category
                };
                dispatch(getArticleNamesByType);
            }).catch((e) => {
                //console.log('error' + e);
            });
        },
        getSearchInfoListAction() {
            //console.log('axios called!');
            axios.get("/api/getSearchInfoList").then((res) => {
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
                //console.log('error' + e);
            });
        },
        changeFocusedState(focused) {
            const changeFocused = {type: 'changeFocusedAction', focused: focused};
            dispatch(changeFocused);
        },
        logoutAction() {
            const logout = {type: 'logoutAction'};
            dispatch(logout);
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
