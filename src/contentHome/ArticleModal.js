import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Modal, Button, ListGroup, ListGroupItem} from 'react-bootstrap';

const HOME_URL = '/';


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
        console.log('artcile result size' + result.size);

        if (result !== null) {

            if (result.constructor.name === 'Array') {
                result.map((item, index) => {
                    titleList.push(
                        <Link to={'/content/' + parentPath + '/article/' + item.id}
                              style={{textDecoration: 'none'}}
                        >
                            <ListGroupItem className="title-item">
                                {item.title}
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


    render() {
        const {result} = this.props;
        let parentPath = this.props.match.params.type;
        console.log('result in detail is' + result + result.constructor.name);
        console.log('rsult is ' + result);
        return (
            <div className="detailDiv">
                <div className='ml-auto articleModalTitle'>
                    <h1 className="articleHeader">{this.props.currentArticleTitle}</h1>
                </div>
                <div>
                    <ListGroup className="articleTitleDiv mr-auto">
                        <div className="articleTitle">
                            <h3>{parentPath.toUpperCase() + " ARTICLE:"}</h3>
                        </div>
                        {this.renderTitleList(result)}
                    </ListGroup>
                    <div className="articleContentDiv mr-auto"
                         dangerouslySetInnerHTML={{__html: this.props.currentArticleContent}}>
                    </div>
                </div>
                <div className='copyRight'>
                    {'@Copyright:WenyuInNZ'}
                </div>
                <div className="goPreviousButton">
                    <Link to={parentPath}>
                        <Button
                            size={"lg"}
                            variant={"primary mr-auto"}
                            onClick={() => this.redirectToParent('/content/' + parentPath)}
                        >
                            Back To Previous
                        </Button>
                    </Link>
                </div>
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
        console.log('axios called in article!');
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