import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Row, Col, Container, Button, ListGroup, ListGroupItem, Alert} from 'react-bootstrap';
import {GET_ARTICLE_CONTENT, GET_SUMMARY_LIST_BY_CATEGORY} from "../constant/urlConstant";

const patentName = ['APPARATUS AND METHOD FOR IMPROVING MESSAGE SYSTEM RELIABILITY',
    'HYPER-CONVERGED INFRASTRUCTURE (HCI) DISTRIBUTED MONITORING SYSTEM'];

class ArticlePage extends Component {

    constructor(props) {
        super(props);
        this.renderTitleList = this.renderTitleList.bind(this);
        this.hideModal = () => {
            console.log("hideMoadl called!");
            this.redirectToParent('/content/' + this.props.match.params.type);
        };
        this.redirectToParent = (URL) => {
            console.log("redirect to parent called!");
            this.props.history.push(URL);
        };
        this.renderContent = this.renderContent.bind(this);
        this.isShowLoading = this.isShowLoading.bind(this);
    }

    componentDidMount() {
        let currentArticleId = this.props.match.params.id;
        this.props.loadArticleById(currentArticleId);
        this.props.setNoFooter("true");
        this.props.cleanOriginalArticle();
    }

    componentWillUnmount() {
        this.props.setNoFooter("false");
        this.props.cleanOriginalArticle();
    }

    isShowLoading() {
        let result = this.props.currentArticleContent;
        console.log('!!!!!!!!!!!! show loading function called');
        if (result != null || result) {
            console.log('??????????????1 result is'+result);
            return null;
        } else {
            console.log('??????????????2 result is'+result);
            return (<div style={{color: "Black", fontFamily: "Andale Mono", fontSize: "15px"}}>Loading...</div>);
        }
    }

    //todo need to figure out sessionstorage value store array
    renderTitleList(result) {
        let parentPath = this.props.match.params.type;
        let titleList = [];
        if (result !== null) {

            //need to force refresh react link here, or it won't update the data.
            if (result.constructor.name === 'Array') {
                result.map((item, index) => {
                    titleList.push(
                        <Link onClick={this.forceUpdate} to={'/content/' + parentPath + '/article/' + item.id}
                              style={{textDecoration: 'none', marginLeft: '5%', marginRight: '3%'}}
                        >
                            <ListGroupItem className="title-item">
                                <span>{item.title}</span>
                            </ListGroupItem>
                        </Link>)
                })
            } else {
                result.map((item) => {
                    console.log('now item is' + item.get('id'));
                    titleList.push(
                        <Link onClick={this.forceUpdate} to={'/content/' + parentPath + '/article/' + item.get('id')}
                              style={{textDecoration: 'none', marginLeft: '5%', marginRight: '3%'}}
                        >
                            <ListGroupItem className="title-item">
                                {item.get('title')}
                            </ListGroupItem>
                        </Link>)
                })
            }
        };
        return titleList;
    }

    renderContent() {
        let id = this.props.match.params.id;
        if (this.props.match.params.type === 'patents') {
            switch (id) {
                case '100':
                    return (<div className="patentImgDiv">
                        <img className="patentImg" src={require('../statics/patent0.png')}/>
                    </div>);
                case '101':
                    return (<div className="patentImgDiv">
                        <img className="patentImg" src={require('../statics/patent1.png')}/>
                    </div>);
                default:
                    return null;
            }
        } else {
            return (
                <div className="contentArticleDiv">
                    {this.isShowLoading()}
                    <div className="contentArticleDetail"
                         dangerouslySetInnerHTML={{__html: this.props.currentArticleContent}}>
                    </div>
                </div>);
        }
    }

    render() {
        const {result} = this.props;
        let parentPath = this.props.match.params.type;
        let id = this.props.match.params.id;
        if (result === null || result.size === 0) {
            this.props.loadArticleTitleByParent(parentPath, id);
        }
        return (
            <div className="detailDiv">
                <Container>
                    <div className='ml-auto articleContentTitle'>
                        <h1 className="articleHeader">{this.props.currentArticleTitle}</h1>
                    </div>

                    <Row>
                        <Col xs={12} sm={12} md={12} lg={2} xl={2}>
                            <ListGroup className="articleTitleDiv mr-auto">

                                <div className="articleTitle">
                                    <h3>{parentPath.toUpperCase() + " ARTICLE:"}</h3>
                                </div>

                                {this.renderTitleList(result)}

                            </ListGroup>
                        </Col>
                        <Col xs={12} sm={12} md={10} lg={10} xl={10} className={{marginLeft: '1%'}}>

                            {this.renderContent()}
                        </Col>

                    </Row>


                    <div className="contentFooter">
                        <div className="goPreviousButton">
                            <Link to={parentPath}>
                                <Button
                                    className='m-auto'
                                    size={'lg'}
                                    variant={"dark"}
                                    onClick={() => this.redirectToParent('/content/' + parentPath)}
                                >
                                    Back To Previous
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    currentArticleTitle: state.getIn(['content', 'currentArticleTitle']),
    currentArticleContent: state.getIn(['content', 'currentArticleContent']),
    result: state.getIn(['content', 'result']),
    noFooter: state.getIn(['content', 'noFooter'])
});

const mapDispatchToProps = (dispatch) => ({
    loadArticleTitleByParent(parentPath, id) {
        if (parentPath === 'patents') {
            //for loading patent summary
            let result = [];
            for (let i = 0; i < 2; i++) {
                let currentBrf = {};
                currentBrf.id = 100 + i + '';
                currentBrf.title = patentName[i];
                result.push(currentBrf);
            }
            const getSummaryByTypeAction = {
                type: 'getSummaryByType',
                data: result,
                contentType: parentPath
            };
            dispatch(getSummaryByTypeAction);
        } else {
            axios.get(GET_SUMMARY_LIST_BY_CATEGORY, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {},
                params: {'articleCategory': parentPath}
            }).then((res) => {
                let originAxiosRes = res.data.articleList;
                let result = [];
                console.log('!!!!!!!!!!' + originAxiosRes);
                console.log("originAxiosRes length is" + originAxiosRes.length);
                for (let i = 0; i < originAxiosRes.length; i++) {
                    result.push(processEachArticleBrief(originAxiosRes[i]));
                }
                const getSummaryByTypeAction = {
                    type: 'getSummaryByType',
                    data: result,
                    contentType: parentPath
                };
                dispatch(getSummaryByTypeAction);
            }).catch((e) => {
                console.log('error' + e);
            });
        }

    },
    cleanOriginalArticle() {
        console.log("?????????called clean ");
        const cleanOriginalArticleAction = {
            type: 'cleanOriginalArticleAction'
        };
        dispatch(cleanOriginalArticleAction);
    },
    loadArticleById(id) {
        const getArticleByIdAction = {
            type: 'getArticleById',
            title: null,
            content: null
        };
        //100 and 101 are for loading local patent img.
        if (parseInt(id) === 100 || parseInt(id) === 101) {
            console.log('patent current id is' + id);
            switch (id) {
                case '100':
                    console.log(patentName[0]);
                    getArticleByIdAction.title = patentName[0];
                    dispatch(getArticleByIdAction);
                    return;
                case '101':
                    getArticleByIdAction.title = patentName[1];
                    dispatch(getArticleByIdAction);
                    return;
                default:
                    return;
            }
        } else {
            console.log('ready to load article! ' + id);
            axios.get(GET_ARTICLE_CONTENT, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {},
                params: {articleType: 'content', articleID: id}
            })
                .then((res) => {
                    let originAxiosRes = res.data;
                    let articleDetail = originAxiosRes;
                    console.log('content in detail is ' + originAxiosRes);
                    const getArticleByIdAction = {
                        type: 'getArticleById',
                        title: articleDetail.articleName,
                        content: articleDetail.body
                    };
                    dispatch(getArticleByIdAction);
                }).catch((e) => {
                console.log('error' + e);
            });
        }
    },
    setNoFooter(noFooter) {
        console.log('axios called in article!');

        const setNoFooterAction = {
            type: 'setNoFooter',
            noFooter: noFooter
        };
        sessionStorage.setItem("noFooter", noFooter);
        dispatch(setNoFooterAction);

    }
});

function processEachArticleBrief(articleBrf) {
    console.log("processEachArticleBrief called");
    let currentBrf = {};
    currentBrf.id = articleBrf.articleId;
    currentBrf.desc = articleBrf.body;
    currentBrf.title = articleBrf.articleName;
    if (articleBrf.img != null) {
        currentBrf.img = articleBrf.img;
    }
    return currentBrf;
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
