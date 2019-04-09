import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    Navsearch,
    SearchInfo,
    SearchInfoItem,
    SearchInfoList,
    Button
} from "./style";
import axios from 'axios';

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


    getSearchInfo() {
        console.log('get search info called!');
        const getSearchList = this.props.getSearchInfoListAction;
        const pageList = [];

        let focused = this.props.focused;
        let list = this.props.list;
        console.log('!!!!!' + this.props.list.size);
        if (list.size === 0) {
            getSearchList();
        }
        console.log('this list is ' + list);


        for (let i = 0; i < list.length; i++) {
            pageList.push(
                <SearchInfoItem key={list[i]}>
                    {list[i]}
                </SearchInfoItem>
            );
        }


        console.log("list length" + pageList.length);
        if (focused) {
            return (
                <SearchInfo>
                    推荐列表：
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            );
        } else {
            return null;
        }
    }

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
                <NavItem className={loginMouseHover ? 'hover right' : 'right'}
                         onClick={this.redirectToLogin.bind(this, LOGIN_URL)} onMouseEnter={() => {
                    this.handleMouserIn('login');
                    this.forceUpdate();
                }} onMouseLeave={() => {
                    this.handleMouserOut('login');
                    this.forceUpdate();
                }}>登陆</NavItem>);
        } else {
            //todo creat list contains logout
            return (<NavItem className={logoutMouseHover ? 'login right' : 'right'} onClick={() => {
                this.props.logoutAction();
                this.redirectToHome(HOME_URL);
            }} onMouseEnter={() => {
                this.handleMouserIn('logout');
                this.forceUpdate();
            }} onMouseLeave={() => {
                this.handleMouserOut('logout');
                this.forceUpdate();
            }}>Welcome {username}, click here to logout</NavItem>);
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

    //todo will add register function
    render() {
        const {focused, username} = this.props;
        console.log('username is from props ' + username);
        const LOGIN_URL = '/Login';
        return (

            <HeaderWrapper>
                <Link to='/'>
                    <Logo/>
                </Link>
                <Nav>
                    <Link to='/'> <NavItem className={homeMouseHover ? 'hover left' : 'left'} onMouseEnter={() => {
                        this.handleMouserIn('home');
                        this.forceUpdate();
                    }} onMouseLeave={() => {
                        this.handleMouserOut('home');
                        this.forceUpdate();
                    }}>首页</NavItem></Link>
                    <NavItem className={downloadMouseHover ? 'hover left' : 'left'} onMouseEnter={() => {
                        this.handleMouserIn("download");
                        this.forceUpdate();
                    }} onMouseLeave={() => {
                        this.handleMouserOut("download");
                        this.forceUpdate();
                    }}>下载App</NavItem>
                    {this.getLoginState(username, LOGIN_URL)}

                    <NavItem className={characterMouseHover ? 'hover right' : 'right'} onMouseEnter={() => {
                        this.handleMouserIn('character');
                        this.forceUpdate();
                    }} onMouseLeave={() => {
                        this.handleMouserOut('character');
                        this.forceUpdate();
                    }}>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <NavItem className='right hover'/>
                </Nav>
                <Link to='/write'>
                    <Button className='writting'>
                        <i className="iconfont">&#xe615;</i>
                        写文章
                    </Button>
                </Link>

                <SearchWrapper>
                    <Navsearch className={focused ? 'expand' : 'default'}
                               onClick={this.searchInfoHandleClick.bind(this)}
                               onBlur={this.searchInfoHandleBlur.bind(this)}>
                    </Navsearch>
                    <i className={focused ? 'focused iconfont' : 'iconfont'}>
                        &#xe614;
                    </i>

                    {focused ? this.getSearchInfo() : null}

                </SearchWrapper>
            </HeaderWrapper>
        );

    }

}

const mapStateToProps = (state) => {
    console.log('mapToState called');
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        username: state.getIn(['login', 'username'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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