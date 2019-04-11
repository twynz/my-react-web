import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {DetailWrapper, Header, Content} from '../home/style';
import axios from "axios";


class Detail extends Component {

    componentDidMount() {
        console.log("called in component did mount");
        let id = this.props.match.params.id;
        let result = this.props.contentDetails.filter(obj => {
            return obj.id === id
        });
        console.log('in component did mount ' + result.size);
        if (result.size > 0) {
            console.log('result is ' + result);
            console.log("no need to reload, cache works!");
        } else {
            this.props.getDetailContent(id);
        }
    }

    render() {
        let id = this.props.match.params.id;
        let contentDetails = this.props.contentDetails;
        let result = contentDetails.filter(obj => {
            console.log('obj id' + obj.id + (obj.id === id) + id);
            return obj.id === id
        });
        //let obj = result[0].get('id');
        console.log('Detail result is ' + result);

        let content = null;
        let title = null;

        console.log('Detail result length is ' + result.size);
        if (result.size > 0) {
            let targetObject = result.get(0);

            console.log('content is ' + targetObject.content);
            console.log('titile is ' + targetObject.title);
            content = targetObject.content;
            title = targetObject.title;

        }


        if (this.props.isLogined) {
            return (
                <DetailWrapper>
                    <Header>{title}</Header>
                    <Content
                        dangerouslySetInnerHTML={{__html: content}}
                    />
                </DetailWrapper>
            );
        } else {
            let currentPath = '/detail/' + id;
            console.log('current path is '+currentPath);
            console.log('current path in redux is '+this.props.redirectPath);
            if (this.props.redirectPath !== currentPath) {
                this.props.setCurrentPathToLoginModule(currentPath);
            }
            return <Redirect to='/Login'/>
        }
    }
}

const mapStateToProps = (state) => ({
    contentDetails: state.getIn(['detail', 'contentDetails']),
    isLogined: state.getIn(['login', 'isLogined']),
    redirectPath: state.getIn(['login', 'previousPath'])
});

const mapDispatchToProps = (dispatch) => ({
    getDetailContent(id) {
        console.log('page get axios called!');
        axios.get("/api/getDetail", {
            params: {
                id: id,
            }
        }).then((res) => {
            let result = res.data.data;
            console.log('content is ' + result.content);

            const getDetailContentByIdAction = {
                type: 'getDetailContentByIdAction',
                title: result.title,
                content: result.content,
                id: id
            };
            dispatch(getDetailContentByIdAction);
        }).catch((e) => {
            console.log('error' + e);
        });
    },
    setCurrentPathToLoginModule(path) {
        const setCurrentPathToLogin = {
            type: 'recordPreviousPathAction',
            redirectPath: path
        };
        sessionStorage.setItem('redirectPath', path);
        dispatch(setCurrentPathToLogin);
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
