import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem
} from "./style";

class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo/>
                </Link>
                <Nav>
                    <NavItem>首页</NavItem>
                    <NavItem>下载App</NavItem>
                    <NavItem>登陆</NavItem>
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                </Nav>
            </HeaderWrapper>
        );
    }

}

export default connect(null, null)(Header);