import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Row, Col, Container,Button, ListGroup, ListGroupItem} from 'react-bootstrap';

const patentName = ['APPARATUS AND METHOD FOR IMPROVING MESSAGE SYSTEM RELIABILITY',
    'HYPER-CONVERGED INFRASTRUCTURE (HCI) DISTRIBUTED MONITORING SYSTEM'];

class ArticleModal extends Component {

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
    }

    componentDidMount() {
        let currentArticleId = this.props.match.params.id;
        this.props.loadArticleById(currentArticleId);
        this.props.setNoFooter("true");
    }

    componentWillUnmount() {
        this.props.setNoFooter("false");
    }


    //todo need to figure out sessionstorage value store array
    renderTitleList(result) {
        let parentPath = this.props.match.params.type;
        let titleList = [];
        if (result !== null) {

            if (result.constructor.name === 'Array') {
                result.map((item, index) => {
                    titleList.push(
                        <Link to={'/content/' + parentPath + '/article/' + item.id}
                              style={{textDecoration: 'none'}}
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
                        <Link to={'/content/' + parentPath + '/article/' + item.get('id')}
                              style={{textDecoration: 'none'}}
                        >
                            <ListGroupItem className="title-item">
                                {item.get('title')}
                            </ListGroupItem>
                        </Link>)
                })
            }
        }
        ;
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
                <div className="contentArticleDetail"
                     dangerouslySetInnerHTML={{__html: this.props.currentArticleContent}}>
                </div>
                </div>);
        }
    }


    render() {
        const {result} = this.props;
        let parentPath = this.props.match.params.type;
        return (
            <div className="detailDiv">
<Container>
                <div className='ml-auto articleContentTitle'>
                    <h1 className="articleHeader">{this.props.currentArticleTitle}</h1>
                </div>

<Row>
    <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                    <ListGroup className="articleTitleDiv mr-auto">

                        <div className="articleTitle">
                            <h3>{parentPath.toUpperCase() + " ARTICLE:"}</h3>
                        </div>

                        {this.renderTitleList(result)}

                    </ListGroup>
    </Col>
    <Col xs={12} sm={12} md={10} lg={10} xl={10}>

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
    loadArticleById(id) {
        const getArticleByIdAction = {
            type: 'getArticleById',
            title: null,
            content: null
        };
        if (parseInt(id) >= 100) {
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
            axios.get("/api/getArticle", {params: {id: id}})
                .then((res) => {
                    let originAxiosRes = res.data.data;
                    let articleDetail = originAxiosRes;
                    const getArticleByIdAction = {
                        type: 'getArticleById',
                        title: articleDetail.title,
                        content: articleDetail.content
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleModal);