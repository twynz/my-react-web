import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import {Modal, Button} from 'react-bootstrap';
import { ImageResize } from 'quill-image-resize-module';
import './style.css';

const HOME_URL = '/';

Quill.register('modules/imageResize', ImageResize);

function loadDarftContent(){
    let content = sessionStorage.getItem("draftContent");
    if(content!=null) {
        return content;
    }
    return '';
}

//todo use react lifecycle function to check login state and do redirect
class Write extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorHtml:loadDarftContent(),
            theme: 'snow',
            placeholder: 'Never be afraid of your enemy and have a nice day!',
            isShowModal: true,
            type: null,
            articleType: null
        };
        this.hideModal = () => {
            this.setState({isShowModal: false});
            this.redirectToHome(HOME_URL);
        };
        this.redirectToHome = () => {
            this.props.history.push(HOME_URL);
        };
    }

    handleThemeChange(item) {
        console.log('set theme to ' + item);
        this.setState({theme: item});
    }

    handleTypeChange(item) {
        console.log('set type to ' + item);
        this.setState({type: item});
    }

    handleArticleTypeChange(item) {
        console.log('set type to ' + item);
        this.setState({articleType: item});
    }

    handleEditorChange(value) {
        this.setState({editorHtml: value})
    }

    handleSubmit() {
        let content = this.state.editorHtml;
        if (content === '' || content === null) {
            alert("Empty content not allowed!");
            return;
        }
        console.log("内容是" + content);
    }

    handleSave() {
        let content = this.state.editorHtml;
        if (content === '' || content === null) {
            alert("Empty content not allowed!");
            return;
        }
        sessionStorage.setItem('draftContent',content);
    }



    render() {
        const {isLogined} = this.props;
        console.log('is loginin is'+isLogined);
        if (isLogined) {
            return (
                <Modal
                    size={"lg"}
                    show={this.state.isShowModal}
                    centered
                    onHide={this.hideModal}
                >
                    <Modal.Header
                        closeButton
                    >
                        <div className={"modalHeader"}>
                         Don't forget to select tech type.
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <ReactQuill theme={this.state.theme}
                                      modules={Write.modules}
                                      formats={Write.formats}
                                      placeholder={this.state.placeholder}
                                      className={'ql-editor'}
                                      value={this.state.editorHtml}
                                      onChange={this.handleEditorChange.bind(this)}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="themeChanger">
                            <label>Change a theme </label>
                            <select onChange={(e) =>
                                this.handleThemeChange(e.target.value)}>
                                <option value="snow">Snow</option>
                                <option value="bubble">Bubble</option>
                            </select>
                        </div>

                        <div className="breifOrDetail">
                            <label>Select Article Type</label>
                            <select onChange={(e) =>
                                this.handleArticleTypeChange(e.target.value)}>
                                <option value="brief">brief</option>
                                <option value="detail">detail</option>
                            </select>
                        </div>
                        <div className="typeSelect">
                            <label>Select Tech Type</label>
                            <select onChange={(e) =>
                                this.handleTypeChange(e.target.value)}>
                                <option value="frontend">frontend</option>
                                <option value="backend">backend</option>
                                <option value="devops">devops</option>
                                <option value="architecture">architecture</option>
                            </select>
                        </div>
                        <Button onClick={this.handleSave.bind(this)}>
                            Save To Session
                        </Button>
                        <Button onClick={this.handleSubmit.bind(this)}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            if (this.props.redirectPath !== '/write') {
                this.props.setCurrentPathToLoginModule();
            }
            return <Redirect to='/Login'/>
        }
    }
}

Write.modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
    imageResize: true
};

Write.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

const mapStateToProps = (state) => {
    return {
        isLogined: state.getIn(['login', 'isLogined']),
        username: state.getIn(['login', 'username']),
        redirectPath: state.getIn(['login', 'previousPath'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPathToLoginModule() {
            const setCurrentPathToLogin = {
                type: 'recordPreviousPathAction',
                redirectPath: '/write'
            };
            sessionStorage.setItem('redirectPath', '/write');
            dispatch(setCurrentPathToLogin);
        }
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Write));