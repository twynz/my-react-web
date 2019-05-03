import React, {Component} from "react";
import iconSet from '../../statics/selection.json';
import IcomoonReact from 'icomoon-react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Navbar, Nav} from 'react-bootstrap';
import "./style.css";

class Footer extends Component {

    render() {
     console.log('in footer load resume is'+this.props.noFooter);
        if (this.props.noFooter === 'true') {
            return null;
        } else {
            console.log("step in footer");
            return (
                <div className="footer">
                    <Navbar bg="transparent" variant="dark" className="col-md-offset-3">
                        <Nav md="auto">
                            <div className=" col-md-5">
                                <h4 className="h4titile">
                                    About This Web:
                                </h4>
                                <p className="aboutp">
                                    This web is used for learning react and front end knowledge in NZ.
                                    You can check the Tech Details button in Navigation to check the
                                    tech I used to creat the website.
                                </p>
                            </div>
                        </Nav>

                        <Nav>
                            <ul className="customize-li col-md-offset-8">
                                <li>
                                    <IcomoonReact className="icon-cust" color="#f4f141" iconSet={iconSet} size={20}
                                                  icon="envelope"/>
                                    : wenyuforwes@163.com
                                </li>
                                <li>
                                    <IcomoonReact className="icon-cust" color="white" iconSet={iconSet} size={20}
                                                  icon="mobile"/>
                                    : (+64)0291275010
                                </li>
                                <li className="customize-li">
                                    <IcomoonReact className="icon-cust" color="#429ef4" iconSet={iconSet} size={20}
                                                  icon="linkedin-square"/>
                                    : <a className="linkedin-href customize-li"
                                         href="https://www.linkedin.com/in/wenyu-tang-827854126/">My Profile</a>
                                </li>
                                <li className="customize-li">
                                    <IcomoonReact className="icon-cust" color="#eaecef" iconSet={iconSet} size={20}
                                                  icon="github"/>
                                    : <a className="github-href customize-li"
                                         href="https://github.com/twynz">My GitHub</a>
                                </li>
                                <li className="copyright">
                                    @Copyright: Wenyu In NZ
                                </li>
                            </ul>
                        </Nav>
                    </Navbar>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    noFooter: state.getIn(['content', 'noFooter'])
});


export default withRouter(connect(mapStateToProps, null)(Footer));