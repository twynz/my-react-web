import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import './style.css';

class Resume extends Component {

    componentDidMount() {
        this.props.setNoResume("true");
    }

    componentWillUnmount() {
        this.props.setNoResume("false");
    }

    render() {
        return (

            <div className="resumeFragment">
                <div id="page-wrap">

                    <img src={require("../statics/avatar.png")} id="pic"/>

                    <div id="contact-info" className="vcard">

                        <h1 className="fn">Wenyu Tang</h1>

                        <p>
                            Cell: <span className="tel">029 1275010</span><br/>
                            Email: <a className="email"
                                      href="mailto:wenyuforwes@163.com">wenyuforwes@163.com</a>
                        </p>
                    </div>

                    <div id="objective">
                        <p>
                            Before I came here in New Zealand,
                            Worked as a software engineer for nearly 3 years and have experiences in top company(DELL EMC)
                            and famous startup(Tradeshift).</p>

                        <p>    Having skills mainly on Java, I am pretty good at web backend programming. Such as micro services
                            and relating architecture stuffs such as message-queue, cache, cloud framework for building
                            services(If you were interested, you can view tech details in navbar to view some cool things
                            I used to build this web). I also know some front-end and devops knowledge just like I use
                            react to build this web's interfaces.
                        </p>
                        <p>
                            Well, I am also very good at self-learning&driven and do innovations. One proof is that I had
                            3 US patents filed at United Trademark and Patents Office. All of these patnets I invented during
                            my daily work and as first inventor for 2 of them. I am currently a pgd student at Massey University,
                            will graduate at October 2019. Hope to find a job here and welcome any internship opportunity
                            before I graduate.
                        </p>
                    </div>

                    <div className="clear"/>

                    <dl>
                        <dd className="clear"/>

                        <dt>Education</dt>
                        <dd>
                            <h2>Massey University (Postgraduate Diploma)</h2>
                            <p>
                                <p>
                                    <strong>Major:</strong>Information Technology<br/>
                                    <strong>Start from:</strong>2019.02 <b>to</b> now
                                </p>
                            </p>
                        </dd>

                        <dd>
                            <h2>Nanjing University (Master Degree)</h2>
                            <p>
                                <strong>Major: </strong>Software Engineering<br/>
                                <strong>Start from: </strong>2014.09 <b>to</b> 2016.06
                            </p>
                        </dd>

                        <dd className="clear"/>

                        <dt>Skills</dt>
                        <dd>
                            <div className="skills">
                               Java
                            </div>
                            <div className="skills">
                                Spring
                            </div>
                            <div className="skills">
                                Spring Security
                            </div>
                            <div className="skills">
                                Spring Cloud
                            </div>
                            <div className="skills">
                                Mybatis
                            </div>
                            <div className="skills">
                                Jersey
                            </div>
                            <div className="skills">
                                Flyway
                            </div>
                            <div className="skills">
                                Python
                            </div>
                            <div className="skills">
                                Git
                            </div>
                            <div className="skills">
                                SQL
                            </div>
                            <div className="skills">
                                Linux shell
                            </div>
                            <div className="skills">
                                Docker
                            </div>
                            <div className="skills">
                                React
                            </div>
                            <div className="skills">
                                Rabbit MQ
                            </div>
                            <div className="skills">
                                Redux
                            </div>
                            <div className="skills">
                                Html
                            </div>
                            <div className="skills">
                                JavaScript
                            </div>
                            <div className="skills">
                                Css
                            </div>
                        </dd>

                        <dd className="clear"/>

                        <dt>Experience</dt>
                        <dd>
                            <h2>DELL EMC <span>Software Engineer 2/Vxrail CPD Team</span></h2>
                            <ul>
                                <li>Develop features for leading HCI storage system Vxrail including Service mangement,
                                lifecycle control, components configuration and service monitoring</li>
                                <li>Resolve product bugs and develop tools for big customers' requirements</li>
                                <li>Participate in internal tech prototype developments.</li>
                            </ul>

                            <h2>TradeShift <span>Software Engineer/Foundation Team</span></h2>
                            <ul>
                                <li>Worked for localization e-invoice projects</li>
                                <li>Help to build architecture and common structure framework and tools to support customer business</li>
                                <li>Back end micro services design, development and code optimization.</li>
                            </ul>

                            <h2>DELL EMC <span>Software Engineer Intern/Data Domain CTD Team</span></h2>
                            <ul>
                                <li>Take part in back end services design and development.</li>
                                <li>Front end development using bootstrap</li>
                                <li>Fix products bugs.</li>
                            </ul>
                        </dd>

                        <dd className="clear"/>

                        <dd className="clear"/>

                        <dt>Recommend Letters </dt>
                        <dd><a href="https://www.linkedin.com/in/wenyu-tang-827854126/">View my linkedin recommendations.</a></dd>

                        <dd className="clear"/>
                    </dl>

                    <div className="clear"/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    noFooter: state.getIn(['content', 'noFooter'])
});

const mapDispatchToProps = (dispatch) => ({
    setNoResume(noFooter) {
        console.log('axios called in article!');

        const setNoFooterAction = {
            type: 'setNoFooter',
            noFooter: noFooter
        };
        sessionStorage.setItem("noFooter", noFooter);
        dispatch(setNoFooterAction);

    }

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Resume));