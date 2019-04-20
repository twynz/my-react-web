import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';
import './styled.css';
import {Navbar, DropdownButton, NavDropdown, Dropdown, Nav,Button,ButtonGroup} from "react-bootstrap";
import {ListInfo, ListItem} from "../../home/style";


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
        console.log('username is ' + username);
        if (username === null) {
            return (
                <Button onClick={this.redirectToLogin.bind(this, LOGIN_URL)}>
                    Sign In
                </Button>);
        } else {
            return (
            <Dropdown as={ButtonGroup}>
                <Button variant="outline-danger" >
                    <link rel="icon" href="../../../public/download_kQp_1.ico" />
                    Welcome, {username}
                </Button>
                <Dropdown.Toggle split id="dropdown-custom-2" variant="outline-primary"/>
                <Dropdown.Menu  className="super-colors" >
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => {
                        this.props.logoutAction();
                        this.redirectToHome(HOME_URL);
                    }}>Sign Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>);
        }
    }


    redirectToHome(HOME_URL) {
        console.log("redirect to home page");
        this.props.history.push(HOME_URL);
    }

    handleMouserIn(item) {
        if (item === 'home') {
            homeMouseHover = true;
        }
        if (item === 'login') {
            loginMouseHover = true;
        }
        if (item === 'download') {
            downloadMouseHover = true;
        }
        if (item === 'character') {
            characterMouseHover = true;
        }
        if (item === 'logout') {
            logoutMouseHover = true;
        }

    }

    handleMouserOut(item) {
        if (item === 'home') {
            homeMouseHover = false;
        }
        if (item === 'login') {
            loginMouseHover = false;
        }
        if (item === 'download') {
            downloadMouseHover = false;
        }
        if (item === 'character') {
            characterMouseHover = false;
        }
        if (item === 'logout') {
            logoutMouseHover = false;
        }
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
        console.log('username is from props ' + username);
        const LOGIN_URL = '/Login';
        return (

            <div>
                <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand href="#">Wenyu In NZ</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#pricing">My Resume</Nav.Link>

                        <Dropdown as={ButtonGroup}>
                            <Button variant="outline-primary" >Technical Details</Button>
                            <Dropdown.Toggle split id="dropdown-custom-2" variant="outline-primary"/>
                            <Dropdown.Menu  className="super-colors" >
                                <Dropdown.Item eventKey="1">Instruction</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    Front End
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="3">
                                    Back End
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="4">Dev Ops</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>


                        <Link to="/write">
                            <Button className="writting" variant="danger">
                                <i className="iconfont">&#xe615;</i>
                                Write Article
                            </Button>
                        </Link>
                        {this.getLoginState()}
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