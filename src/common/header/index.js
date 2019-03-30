import React, {Component} from "react";
import {Link} from "react-router-dom";
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
    SearchInfoList
} from "./style";
import axios from 'axios';


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
        console.log('!!!!!'+this.props.list.size);
        if(list.size === 0) {
            getSearchList();
        }
        console.log('this list is '+list);



        for(let i = 0;i<list.length;i++) {
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

    render() {
        const { focused }= this.props;
        console.log('render called focused is'+focused);

        return (

            <HeaderWrapper>
                <Link to='/'>
                    <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登陆</NavItem>
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                </Nav>
                <SearchWrapper>
                    <Navsearch className={focused ? 'expand' : 'default'}
                               onClick={this.searchInfoHandleClick.bind(this)}
                               onBlur={this.searchInfoHandleBlur.bind(this)}>
                    </Navsearch>
                    <i className={focused ? 'focused iconfont' : 'iconfont'}>
                        &#xe614;
                    </i>

                    {focused?this.getSearchInfo():null}

                </SearchWrapper>
            </HeaderWrapper>
        );
    }

}



const mapStateToProps = (state) => {
    console.log('mapToState called');
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header','list'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchInfoListAction() {
            console.log('axios called!');
            axios.get("/api/getSearchInfoList").then((res) => {
                let originAxiosRes = res.data.data;
                let result = [];

                for(let i=0;i<5;i++) {
                    result.push(originAxiosRes[i]);
                }
                const getInfoListAction =  {
                    type: 'getSearchInfoList',
                    data: result
                };
                dispatch(getInfoListAction);
            }).catch((e) => {
                console.log('error'+e);
            });
        },
        changeFocusedState(focused) {
            const changeFocused = {type: 'changeFocusedAction', focused: focused};
            dispatch(changeFocused);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);