import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import axios from "axios";
import './style.css';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const HOME_URL = '/';

const patentName = ['APPARATUS AND METHOD FOR IMPROVING MESSAGE SYSTEM RELIABILITY',
    'HYPER-CONVERGED INFRASTRUCTURE (HCI) DISTRIBUTED MONITORING SYSTEM'];

class Content extends Component {

    constructor(props) {
        console.log("content construc called");
        super(props);
        this.renderListItem = this.renderListItem.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.loadArticleModalCss = this.loadArticleModalCss.bind(this);
        this.renderImg = this.renderImg.bind(this);
        this.hideModal = () => {
            this.setState({isShowModal: false});
            this.redirectToHome(HOME_URL);
        };
        this.state = {
            isShowModal: true,
            articleModal: false
        }
    }

    componentDidMount() {
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
        console.log('!!!!!!!!!!!!!!!!!itemImage is '+itemImage);
        if(itemImage != null) {
            return <img alt='' className='pic' src={itemImage}/>
        }
        return null;
    }

    renderListItem(result) {
        console.log('result in content is '+result);
        let contentType = this.props.match.params.type;
        let itemList = [];
        if (result !== null) {
            result.map((item, index) => {
                console.log('!!!!!!!!!!!!!!!!!itemImage is '+item.img);
                itemList.push(
                    <Link to={'/content/'+contentType+'/article/' + item.id}
                          style={{textDecoration: 'none'}}
                    >
                        <div className="contentDiv">
                            <div>
                                {this.renderImg(item.img)}
                                <div className='title'>{item.title}</div>
                                <p className='desc'>{item.desc}</p>
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
                    <Modal.Body
                        style={{backgroundColor: '#373b3f'}}>
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

const mapDispatchToProps = (dispatch) => ({
    loadContentByType(contentType) {
        if(contentType === 'patents') {
            let result = [];
            for(let i=0;i<2;i++) {
                let currentBrf = {};
                currentBrf.id = 100+i+'';
                currentBrf.title = patentName[i];
                result.push(currentBrf);
            }
            const getContentByTypeAction = {
                type: 'getContentByType',
                data: result,
                contentType: contentType
            };
            dispatch(getContentByTypeAction);
        }
        else {
            axios.get("/api/getContent", {params: {type: contentType}})
                .then((res) => {
                    let originAxiosRes = res.data.data;
                    let result = [];
                    console.log("originAxiosRes length is" + originAxiosRes.length);
                    for (let i = 0; i < originAxiosRes.length; i++) {
                        result.push(processEachArticleBrief(originAxiosRes[i]));
                    }
                    const getContentByTypeAction = {
                        type: 'getContentByType',
                        data: result,
                        contentType: contentType
                    };
                    dispatch(getContentByTypeAction);
                }).catch((e) => {
                console.log('error' + e);
            });
        }
    }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));