/* eslint-disable */
import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import './style.css';

class AboutMe extends Component {

    componentDidMount() {
        this.props.setNoResume("true");
    }

    componentWillUnmount() {
        this.props.setNoResume("false");
    }

    render() {
        return (
            <div className="aboutMeDiv">
                <header className='masthead'>
                    <div style={{textAlign: 'center'}}>
                    <img src={require("../statics/avatar2.png")} id="aboutmepic"/>
                    </div>
                    <p className='masthead-intro'>Hi I'm</p>
                    <h1 className='masthead-heading'>WENYU!</h1>
                </header>
                <section className="introduction-section">
                    <h1>Introduction</h1>
                    <p className='aboutMeP'>I am a experienced software developer, mainly focus on backend services
                        (also know front end knowledge), good at building web applications.</p>
                    <p className='aboutMeP'>
                        I love the internet, technology, and having passion for new&cool things. I'm innovative and
                        a quick learner. Want to become a full stack engineer here, so I am trying to improve my devops skills.
                    </p>
                </section>
                <section className="location-section">
                    <h1>Where I'm From</h1>
                    <p className='aboutMeP'>I'm originally from Nanjing, China. </p>
                </section>
                <section
                    className="questions-section">
                    <h1> More
                        About
                        Me </h1>
                    <h2>What are your favorite hobbies?</h2>
                    <p className='aboutMeP'> At spare time, go to GYM is my favorite way for relaxing. I also a fun of traveling and
                        experiencing new cultures. Besides, I like reading books about politics and economy.
                    </p>
                    <h2> Why come to New Zealand?</h2>
                    <p className='aboutMeP'>
                        I am still young, I have been growing in China for more than 20 years. I just think changing
                        a way of life is an exciting thing. So I resigned my job from Dell and come to Auckland. I am
                        quite confident depending my skill I can achieve my goal here.
                    </p>
                    <h2>
                        Where do you live ?
                    </h2>
                    <p className='aboutMeP'>
                        I am currently living in Greenhithe, a beautiful community in Auckland.
                    </p>
                    <h2>
                        Why do you want to be a web developer?
                    </h2>
                    <p className='aboutMeP'> Because programming a kind of thing that you can see the progress really happening and
                    give me encourage. When you see your logic&design works, that's really awesome!
                    </p>
                </section>

                <footer className="content-footer">

                    <ul className="social">
                        <li className='seeMore'><b>See More:</b></li>
                        <li><a  href='https://github.com/twynz'>GitHub</a></li>
                        <li><a  href='https://www.facebook.com/wenyu.tang.33'>Facebook</a></li>
                        <li><a  href='https://www.linkedin.com/in/wenyu-tang-827854126/'>Linkedin</a></li>
                    </ul>

                </footer>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    noFooter: state.getIn(['content', 'noFooter'])
});

const mapDispatchToProps = (dispatch) => ({
    setNoResume(noFooter) {
        const setNoFooterAction = {
            type: 'setNoFooter',
            noFooter: noFooter
        };
        sessionStorage.setItem("noFooter", noFooter);
        dispatch(setNoFooterAction);

    }

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutMe));
