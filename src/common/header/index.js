import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';
import './styled.css';
import {Navbar, DropdownButton, NavDropdown, Dropdown, Nav,Button,ButtonGroup} from "react-bootstrap";
import {ListInfo, ListItem} from "../../home/style";
import iconSet from '../../statics/selection.json';
import IcomoonReact, {iconList} from 'icomoon-react';


let homeMouseHover = false;
let downloadMouseHover = false;
let loginMouseHover = false;
let characterMouseHover = false;
let logoutMouseHover = false;
const HOME_URL = '/';

class Header extends Component {


    constructor(props) {
        super(props);
    }


    // getSearchInfo() {
    //     console.log('get search info called!');
    //     const getSearchList = this.props.getSearchInfoListAction;
    //     const pageList = [];
    //
    //     let focused = this.props.focused;
    //     let list = this.props.list;
    //     console.log('!!!!!' + this.props.list.size);
    //     if (list.size === 0) {
    //         getSearchList();
    //     }
    //     console.log('this list is ' + list);
    //
    //
    //     for (let i = 0; i < list.length; i++) {
    //         pageList.push(
    //             <SearchInfoItem key={list[i]}>
    //                 {list[i]}
    //             </SearchInfoItem>
    //         );
    //     }
    //
    //
    //     console.log("list length" + pageList.length);
    //     if (focused) {
    //         return (
    //             <SearchInfo>
    //                 推荐列表：
    //                 <SearchInfoList>
    //                     {pageList}
    //                 </SearchInfoList>
    //             </SearchInfo>
    //         );
    //     } else {
    //         return null;
    //     }
    // }

    searchInfoHandleClick() {

        console.log("search method called!");
        this.props.changeFocusedState(true);
    }

    searchInfoHandleBlur() {
        console.log("search method blur called!");
        this.props.changeFocusedState(false);
    }

    redirectToLogin(LOGIN_URL) {
        console.log("redirect to login page");
        this.props.history.push(LOGIN_URL);
    }

    getLoginState(username, LOGIN_URL) {
        console.log('getLogin status username is ' + username+(username != null));
        if(username === null && typeof username === "object") {
            return (
                <Button className="mr-auto" onClick={this.redirectToLogin.bind(this, LOGIN_URL)}>
                    Sign In
                </Button>);
        } else {
            return (
            <div>
                <Dropdown  as={ButtonGroup}>
                    <Button  variant="outline-warning" >
                        <link rel="icon" href="../../../public/download_kQp_1.ico" />
                        Welcome, {username}
                    </Button>
                <Dropdown.Toggle split id="dropdown-custom-2" variant="outline-warning"/>
                    <Dropdown.Menu  className="super-colors" >
                    <Dropdown.Divider />
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
        console.log("redirect to home page");
        this.props.history.push(HOME_URL);
    }

    displayArticleNamesByCategory(category) {
        if(category === 'frontEnd') {
            let { frontEndArticleNames } = this.props;
            if(frontEndArticleNames.size !== 0) {
                frontEndArticleNames.map((item, index) => {
                    return (
                        <NavDropdown.Item href={"/article/"+item}>item</NavDropdown.Item>
                    );
                })
            }
        }
        return null;
    }

    //todo will add register function
    render() {
        const {focused, username, frontEndArticleNames} = this.props;
        console.log('username is from props ' + username+"  "+username==="null");
        const LOGIN_URL = '/Login';
        return (

            <div>
                <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand href="#">Wenyu In NZ</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/">
                            <IcomoonReact iconSet={iconSet}  size={20} color="#f4f142" icon="home" />
                            Home
                        </Nav.Link>
                        <Nav.Link href="#pricing">
                            <IcomoonReact iconSet={iconSet}  size={20} color="white" icon="user" />
                            About Me
                        </Nav.Link>
                        <Nav.Link href="#pricing">
                            <IcomoonReact iconSet={iconSet}  size={20} color="#424ef4" icon="linkedin" />
                            My Resume
                        </Nav.Link>
                        <DropdownButton
                            title="Tech Details"
                            variant="outline-secondary"
                            className="drop-down-button"
                        >
                            <NavDropdown.Item href="#action/3.4">Introduction</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.1">Front End</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Back End</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">DevOps</NavDropdown.Item>
                        </DropdownButton>
                    </Nav>
                    <Nav className="ml-auto">

                        <Button href="/write" variant="danger" className="write-button">
                            <i className="iconfont">&#xe615;</i>
                            Write Article
                        </Button>
                        {this.getLoginState(username,LOGIN_URL)}
                    </Nav>
                </Navbar>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    console.log('mapToState called');
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
            console.log('axios called!');
            axios.get("/api/getArticleNames",{params:{type : category}}).then((res) => {
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
                console.log('error' + e);
            });
        },
        getSearchInfoListAction() {
            console.log('axios called!');
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
                console.log('error' + e);
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));