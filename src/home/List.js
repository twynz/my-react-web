import React, {Component} from 'react';
import {ListItem, ListInfo, LoadMoreButton,BackTop} from './style';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerScroll: false
        };
        this.whetherCustomerScroll = this.whetherCustomerScroll.bind(this);
    }

    whetherCustomerScroll(){
        if (document.documentElement.scrollTop > 100) {
           this.setState({customerScroll: true});
        }else {
            this.setState({customerScroll: false});
        }
    }

    bindEvents() {
        window.addEventListener('scroll', this.whetherCustomerScroll);
    }


    returnToTop(){
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        console.log("called in component did mount");
        this.bindEvents();
        this.props.getArticleBriefListByPage(0, 3);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.whetherCustomerScroll);
    }


    render() {
        const {list, endNum} = this.props;
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <Link key={index} to={'/detail/' + item['id']}>
                                <ListItem>
                                    <img alt='' className='pic' src={item['img']}/>
                                    <ListInfo>
                                        <h3 className='title'>{item['title']}</h3>
                                        <p className='desc'>{item['desc']}</p>
                                    </ListInfo>
                                </ListItem>
                            </Link>
                        );
                    })
                }
                { this.state.customerScroll ? <BackTop onClick={this.returnToTop}>顶部</BackTop> : null}
                <LoadMoreButton onClick={() => {
                    this.props.getArticleBriefListByPage(endNum + 1, endNum + 4);
                }}>More Content</LoadMoreButton>
            </div>
        )
    }
}

function processEachArticleBrief(articleBrf) {
    console.log("processEachArticleBrief called");
    let currentBrf = {};
    currentBrf.id = articleBrf.id;
    currentBrf.desc = articleBrf.desc;
    currentBrf.title = articleBrf.title;
    if (articleBrf.img != null) {
        currentBrf.img = articleBrf.img;
    }
    return currentBrf;
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home', 'articleList']),
    endNum: state.getIn(['home', 'endNum'])
});

const mapDispatchToProps = (dispatch) => ({
    getArticleBriefListByPage(startNum, endNum) {
        console.log('page get axios called!');
        axios.get("/api/getArticleBrief", {
            params: {
                start: startNum,
                end: endNum
            }
        }).then((res) => {
            console.log(res.data.data);
            let originAxiosRes = res.data.data;
            let result = [];

            for (let i = 0; i <= endNum - startNum; i++) {
                console.log('current obj is' + originAxiosRes[i]);
                let obj = processEachArticleBrief(originAxiosRes[i]);
                result.push(obj);
            }
            console.log('result is '+result);
            const getArticleBriefListAction = {
                type: 'getArticleBriefListAction',
                data: result,
                endNum: endNum
            };
            dispatch(getArticleBriefListAction);
        }).catch((e) => {
            console.log('error' + e);
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);