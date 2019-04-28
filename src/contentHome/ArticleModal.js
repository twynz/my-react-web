import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Modal,Button} from 'react-bootstrap';


const HOME_URL = '/';


class ArticleModal extends Component {

    constructor(props) {
        super(props);
        this.renderTitleList = this.renderTitleList.bind(this);
        this.hideModal = () => {
            console.log("hideMoadl called!");
            this.redirectToParent('/content/'+this.props.match.params.type);
        };
        this.redirectToParent = (URL) => {
            console.log("redirect to parent called!");
            this.props.history.push(URL);
        };
    }

    componentDidMount() {
        let currentArticleId = this.props.match.params.id;
        this.props.loadArticleById(currentArticleId);
    }

    //todo need to figure out sessionstorage value store array
    renderTitleList(result) {
        let parentPath = this.props.match.params.type;
        let titleList = [];
        console.log('artcile result size' + result.size);

        if (result !== null) {

            if(result.constructor.name === 'Array')
            {
                result.map((item, index) => {
                    titleList.push(
                        <Link to={'/content/' + parentPath + '/article/' + item.id}
                              style={{textDecoration: 'none'}}
                        >
                            <div className="title-item">
                                <div>
                                    <div>{item.title}</div>
                                </div>
                            </div>
                        </Link>)
                 })
            }
            else {
                result.map((item) => {
                    console.log('now item is' + item.get('id'));
                    titleList.push(
                        <Link to={'/content/' + parentPath + '/article/' + item.get('id')}
                              style={{textDecoration: 'none'}}
                        >
                            <div className="title-item">
                                <div>{item.get('title')}</div>
                            </div>
                        </Link>)
                })
            }
        };
        return titleList;
    }


    render() {
        const {result} = this.props;
        let parentPath = this.props.match.params.type;
        console.log('result in detail is'+result+ result.constructor.name);
        console.log('rsult is '+result);
        return (
            <Fragment>
                <Modal
                    show={true}
                    size={"lg"}
                    onHide={this.hideModal}
                >
                    <Modal.Header className={'articleModal'} closeButton>
                        <div className='m-auto'>

                        </div>
                    </Modal.Header>
                    <Modal.Body className={'articleModal'}>
                        <div>
                            <div className="articleTitleDiv mr-auto">
                                <div className={"articleTitle"}>
                                    {parentPath.toUpperCase() +" ARTICLE:"}
                                </div>
                                {this.renderTitleList(result)}
                            </div>
                            <div className="articleContentDiv mr-auto"
                                 dangerouslySetInnerHTML={{__html: this.props.currentArticleContent}}>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor:"black"}}>
                        <div className='mr-auto copyRight'>
                        {'@Copyright:WenyuInNZ' }
                        </div>
                        <Link to={parentPath}>
                            <Button
                                className={'mr-auto'}
                                variant={"outline-primary"}
                                onClick={()=>this.redirectToParent('/content/'+parentPath)}
                            >
                                Back To Previous
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>

            </Fragment>

        );
    }
}

const mapStateToProps = (state) => ({
    currentArticleTitle: state.getIn(['content', 'currentArticleTitle']),
    currentArticleContent: state.getIn(['content', 'currentArticleContent']),
    result: state.getIn(['content', 'result'])
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleModal);