import React, {Component} from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Redirect} from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import {
    EditorWrapper,
    ThemeSelection,
    Button
} from './style';
import styled from 'styled-components';

const LOGIN_URL = '/Login';

//todo use react lifecycle function to check login state and do redirect
class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {editorHtml: '', theme: 'snow', placeholder: 'Never be afraid of your enemy and have a nice day!'};

    }

    handleThemeChange(item) {
        console.log('set theme to ' + item);
        this.setState({theme: item});
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


    render() {
        const {isLogined} = this.props;
        if (isLogined) {
            return (
                <EditorWrapper>
                    <MyReactQuill theme={this.state.theme}
                                  modules={Write.modules}
                                  formats={Write.formats}
                                  placeholder={this.state.placeholder}
                                  className={'ql-editor'}
                                  value={this.state.editorHtml}
                                  onChange={this.handleEditorChange.bind(this)}
                    />
                    <ThemeSelection className="themeChanger">
                        <label>Change a theme </label>
                        <select onChange={(e) =>
                            this.handleThemeChange(e.target.value)}>
                            <option value="snow">Snow</option>
                            <option value="bubble">Bubble</option>
                        </select>
                    </ThemeSelection>
                    <Button onClick={this.handleSubmit.bind(this)}>
                        Submit
                    </Button>
                </EditorWrapper>
            );
        } else {
            if(this.props.redirectPath !== '/write'){
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
    }
}

Write.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

const MyReactQuill = styled(ReactQuill)`
&.ql-editor{
    min-height: 100px !important;
    max-height: 500px;
}`;

const mapStateToProps = (state) => {
    return {
        isLogined: state.getIn(['login', 'isLogined']),
        username: state.getIn(['login', 'username']),
        redirectPath: state.getIn(['login','previousPath'])
        //authorities: state.getIn(['login', 'authorities'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPathToLoginModule() {
            const setCurrentPathToLogin = {
                type: 'recordPreviousPathAction',
                redirectPath: '/write'
            };
            dispatch(setCurrentPathToLogin);
        }
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Write));