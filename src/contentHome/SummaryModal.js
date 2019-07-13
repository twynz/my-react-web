import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import axios from "axios";
import './style.css';
import {Modal, Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {ADD_ARTICLE, GET_SUMMARY_LIST_BY_CATEGORY} from "../constant/urlConstant";

const HOME_URL = '/';
const WARNNING = 'If you see empty content, please make sure you don\'t block port 10001 and 10002 in your network or backend services cannot be visited';

const patentName = ['APPARATUS AND METHOD FOR IMPROVING MESSAGE SYSTEM RELIABILITY',
    'HYPER-CONVERGED INFRASTRUCTURE (HCI) DISTRIBUTED MONITORING SYSTEM'];

class SummaryModal extends Component {

    constructor(props) {
        console.log("content construc called");
        super(props);
        this.isShowLoading = this.isShowLoading.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.loadArticleModalCss = this.loadArticleModalCss.bind(this);
        this.renderImg = this.renderImg.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {
            isShowModal: true,
            articleModal: false
        }
    }

    hideModal() {
        console.log('on hide called');
        this.props.clearTitle();
        this.setState({isShowModal: false});
        this.redirectToHome(HOME_URL);
    }


    componentDidMount() {
        //clear previous data
        this.props.clearTitle();
        let contentType = this.props.match.params.type;
        this.props.loadContentByType(contentType);
    }

    redirectToHome(HOME_URL) {
        console.log("redirect to home page");
        this.props.history.push(HOME_URL);
    }

    loadArticleModalCss() {
        this.setState({articleModal: true});
    }

    renderImg(itemImage) {
        if (itemImage != null) {
            return <img alt='' className='pic' src={itemImage}/>
        }
        return null;
    }

    isShowLoading() {
        let result = this.props.result;
        console.log('!!!!!!!!!!!!!'+this.props.result);
        if (result != null || result) {
            return null;
        } else {
            return (
                <Alert>
                    <div style={{color:"white",fontFamily:"Andale Mono",fontSize:"15px"}}>Loading...</div>
                </Alert>);
        }
    }

    renderListItem(result) {
        console.log('result in content is ' + result);
        let contentType = this.props.match.params.type;
        let itemList = [];
        if (result !== null) {
            result.map((item, index) => {
                itemList.push(
                    <Link key={item.id} to={'/content/' + contentType + '/article/' + item.id}
                          style={{textDecoration: 'none'}}
                    >
                        <div className="contentDiv">
                            <div>
                                {this.renderImg(item.img)}
                                <div className='title'>{item.title}</div>
                                <p className='desc'  dangerouslySetInnerHTML={{__html: item.desc}} />
                            </div>
                        </div>
                    </Link>)
            })
        };
        return itemList;
    }

    render() {

        const {result} = this.props;
        console.log("data in content render is " + result);
        return (
            <Modal
                show={this.state.isShowModal}
                centered={true}
                onHide={this.hideModal}
            >
                <Modal.Header
                    style={{backgroundColor: '#373b3f'}}
                    closeButton
                >
                    <div className="contentModalTitle">
                        You are viewing {this.props.match.params.type} content:
                    </div>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: '#373b3f'}}>

                    {this.isShowLoading()}
                    {this.renderListItem(result)}
                </Modal.Body>
                <Modal.Footer
                    style={{backgroundColor: '#373b3f'}}
                >
                    <Button className="m-auto" onClick={this.hideModal} variant={"outline-light"}>Back To Home</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    result: state.getIn(['content', 'result'])
});

const mapDispatchToProps = (dispatch) => {
    return ({
        clearTitle() {
            const clearPreviousTitleAction = {
                type: 'clearPreviousTitleAction',
                result: null
            };
            dispatch(clearPreviousTitleAction);
        },
        loadContentByType(contentType) {
            if (contentType === 'patents') {
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
                    contentType: contentType
                };
                dispatch(getSummaryByTypeAction);
            } else {
                //for loading articles summary
                let body = {};

                //axios seems not set content type if no data to send, the solution is to set an empty body
                axios.get(GET_SUMMARY_LIST_BY_CATEGORY, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {},
                    params: {'articleCategory': contentType}
                }).then((res) => {
                        let originAxiosRes = res.data.articleList;
                        let result = [];
                        console.log('!!!!!!!!!!'+originAxiosRes);
                        console.log("originAxiosRes length is" + originAxiosRes.length);
                        for (let i = 0; i < originAxiosRes.length; i++) {
                            result.push(processEachArticleBrief(originAxiosRes[i]));
                        }
                        const getSummaryByTypeAction = {
                            type: 'getSummaryByType',
                            data: result,
                            contentType: contentType
                        };
                        dispatch(getSummaryByTypeAction);
                    }).catch((e) => {
                    console.log('error' + e);
                });
            }
        }
    });
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SummaryModal));
