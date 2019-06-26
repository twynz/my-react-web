import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import {FormControl, Button} from 'react-bootstrap';
import {ImageResize} from 'quill-image-resize-module';
import './style.css';
import axios from "axios";
import qs from "qs";
import {ADD_ARTICLE} from "../constant/urlConstant";

const HOME_URL = '/';

Quill.register('modules/imageResize', ImageResize);

function loadDarftContent() {
    let content = sessionStorage.getItem("draftContent");
    if (content != null) {
        return content;
    }
    return '';
}

//todo use react lifecycle function to check login state and do redirect
class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorHtml: loadDarftContent(),
            theme: 'snow',
            placeholder: 'Never be afraid of your enemy and have a nice day!',
            isShowModal: true,
            articleType: 'brief',
            articleName:null,
            articleAuthor:'Wenyu Tang',
            category:'frontend',
            body:null
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
        let title = this.state.articleName;
        if (content === '' || content === null || title === '' || title === null) {
            alert("Empty content not allowed!");
            return;
        }
        let contentType = this.state.articleType;
        let category = this.state.category;
        let postObj = {};
        postObj[contentType] = contentType;
        postObj[title] = title;
        postObj[category] = category;
        postObj[content] = content;
        console.log("内容是" + content+' title'+title+' category'+category+' type'+contentType);


        // let clientAuthorization = btoa('test:test');
        // clientAuthorization = 'Basic ' + clientAuthorization;
        //
        // axios.post(ADD_ARTICLE, postObj), {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': clientAuthorization,
        //         'token': this.props.access_token,
        //     }
        // }).then((res) => {
        //     console.log('return res' + res);
        // }).catch((e) => {
        //     console.log(e);
        // });
    }

    handleArticleNameChange(event) {
        this.setState({articleName: event.target.value})
    }


    handleSave() {
        let content = this.state.editorHtml;
        if (content === '' || content === null) {
            alert("Empty content not allowed!");
            return;
        }
        sessionStorage.setItem('draftContent', content);
    }

    componentDidMount() {
        this.props.setNoFooter("true");
    }

    componentWillUnmount() {
        this.props.setNoFooter("false");
    }

    render() {
        const {isLogined} = this.props;
        console.log('is loginin is' + isLogined);
        if (isLogined) {
            return (
                <div className="writeArticleDiv">
                    <div className={"modalHeader"}>
                        Don't forget to select tech type.
                    </div>

                    <div className='titleInput'>
                        <FormControl

                            placeholder="articleTitle"
                            aria-label="articleTitle"
                            aria-describedby="basic-addon1"
                            onChange={this.handleArticleNameChange.bind(this)}
                        />
                    </div>
                    <ReactQuill theme={this.state.theme}
                                modules={Write.modules}
                                formats={Write.formats}
                                placeholder={this.state.placeholder}
                                className='ql-editor editorCSS'
                                value={this.state.editorHtml}
                                onChange={this.handleEditorChange.bind(this)}

                    />
                    <div className="typeSelect">
                        <label>Change a theme </label>
                        <select onChange={(e) =>
                            this.handleThemeChange(e.target.value)}>
                            <option value="snow">Snow</option>
                            <option value="bubble">Bubble</option>
                        </select>


                        <div>
                            <label>Select Article Type</label>
                            <select onChange={(e) =>
                                this.handleArticleTypeChange(e.target.value)}>
                                <option value="brief">brief</option>
                                <option value="detail">detail</option>
                            </select>
                        </div>
                        <div>
                            <label>Select Tech Type</label>
                            <select onChange={(e) =>
                                this.handleTypeChange(e.target.value)}>
                                <option value="frontend">frontend</option>
                                <option value="backend">backend</option>
                                <option value="devops">devops</option>
                                <option value="architecture">architecture</option>
                            </select>
                        </div>
                        <Button className="editorButton1" onClick={this.handleSave.bind(this)}>
                            Save To Session
                        </Button>
                        <Button className="editorButton2" onClick={this.handleSubmit.bind(this)}>
                            Submit
                        </Button>
                    </div>
                </div>
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
        redirectPath: state.getIn(['login', 'previousPath']),
        access_token: state.getIn(['login', 'access_token']),
        noFooter: state.getIn(['content', 'noFooter'])
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
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Write));
