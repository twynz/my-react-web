import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import './style.css';
import {Row, Col, Container} from 'react-bootstrap';

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


                    <div id="contact-info" className="vcard">

                        <h1 className="fn">Wenyu Tang</h1>

                        <p>
                            <b>Cell:</b> <span className="tel"> 029 1275010</span><br/>
                            <b>Email:</b> <a className="email"
                                      href="mailto:wenyuforwes@163.com"> wenyuforwes@163.com</a>
                        </p>
                    </div>

                    <div className="objective">
                        <p className='descP'>
                            Before I came here in New Zealand,
                            Worked as a software engineer for nearly 3 years and have experiences in top company(DELL
                            EMC)
                            and famous startup(Tradeshift).
                        </p>

                        <p> Having skills mainly on Java, I am pretty good at web backend programming. Such as micro
                            services
                            and relating architecture stuffs such as message-queue, cache, cloud framework for building
                            services(If you were interested, you can view tech details in navbar to view some cool
                            things
                            I used to build this web). I also know some front-end and devops knowledge just like I use
                            react to build this web's interfaces.
                        </p>
                        <p>
                            Well, I am also very good at self-learning&driven and do innovations. One proof is that I
                            had
                            2 US patents filed at United Trademark and Patents Office and 1 China patent. All of these
                            patents I invented during
                            my daily work. I am currently a pgd student at Massey University,
                            will graduate at October 2019. Hope to find a job here and welcome any internship
                            opportunity
                            before I graduate.
                        </p>
                    </div>

                    <div className="clear"/>

                    <div className='skillDiv'>


                        <div className='skillTitle'><h3 style={{marginTop: "20px"}} className='companyName'>Education</h3></div>
<br/>
                        <div style={{margin: '5px'}}>
                            <h2 className='companyName'>Massey University (Postgraduate Diploma)</h2>
                                <p className='educationP'>
                                    <strong>- Major:</strong>Information Technology<br/>
                                    <strong>- Start from:</strong>2019.02 <b>to</b> now
                                </p>
                        </div>

                        <div style={{margin: '5px'}}>
                            <h2 className='companyName'>Nanjing University (Master Degree)</h2>
                            <br/>
                            <p>
                                <strong>- Major: </strong>Software Engineering<br/>
                                <strong>- Start from: </strong>2014.09 <b>to</b> 2016.06
                            </p>
                        </div>
                    </div>


                    <div className="skillDiv">
                        <div className="skillTitle">
                            <h3>Skills:</h3>
                        </div>
                        <div>
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
                        </div>
                    </div>
                    <dd className="clear"/>

                    <div className='skillDiv'><h3 className='skillTitle'>Experience</h3></div>
                    <div className='skillDiv'>

                        <h2 className='companyName'>DELL EMC</h2>
                            <div className='companyTitle'>
                                Software Engineer 2/Vxrail CPD Team
                            </div>
                        <ul>
                            <li>Develop features for leading HCI storage system Vxrail including Service mangement,
                                lifecycle control, components configuration and service monitoring
                            </li>
                            <li>Resolve product bugs and develop tools for big customers' requirements</li>
                            <li>Participate in internal tech prototype developments.</li>
                        </ul>

                        <h2 className='companyName'>TradeShift</h2>
                        <div className='companyTitle'>Software Engineer/Foundation Team</div>
                        <ul>
                            <li>Worked for localization e-invoice projects</li>
                            <li>Help to build architecture and common structure framework and tools to support customer
                                business
                            </li>
                            <li>Back end micro services design, development and code optimization.</li>
                        </ul>

                        <h2 className='companyName'>DELL EMC</h2>
                        <div className='companyTitle'>Software Engineer Intern/Data Domain CTD Team</div>
                        <ul>
                            <li>Take part in back end services design and development.</li>
                            <li>Front end development using bootstrap</li>
                            <li>Fix products bugs.</li>
                        </ul>
                    </div>

                    <dd className="clear"/>

                    <dd className="clear"/>

                    <div className='skillDiv'><h3 className='skillTitle'>Recommend Letters</h3></div>
                    <div className='skillDiv'><a href="https://www.linkedin.com/in/wenyu-tang-827854126/">View my linkedin
                        recommendations.</a></div>

                    <dd className="clear"/>
                </div>

                <div className="clear"/>
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