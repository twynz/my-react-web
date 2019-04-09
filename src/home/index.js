import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    HomeWrapper,
    ArticleWrapper
} from './style';
import List from "./List";

class Home extends Component {


    //
    // bindEvents() {
    //
    // }


    render() {
        return (
            <HomeWrapper>
                <ArticleWrapper>
                    <List/>
                </ArticleWrapper>

            </HomeWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapToState called');
    return {
        articleList: state.getIn(['home', 'articleList']),
        endNumber: state.getIn(['home', 'endNum'])
    }
}

export default connect(mapStateToProps, null)(Home);
