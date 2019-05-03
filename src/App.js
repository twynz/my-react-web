import React, {Component} from 'react';
import Header from './common/header';
import {connect, Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import './statics/iconfont/iconfont';
import Login from './common/login';
import Write from './write';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css';
import Footer from "./common/footer";
import Content from "./contentHome/Content.js";
import ArticleModal from "./contentHome/ArticleModal.js";
import Wwrite from "./resume/index.js";

class App extends Component {

    // whetherRenderFooter() {
    //     if(this.props.NoResume === 'false') {
    //         return <Footer/>
    //     }
    //     return  null;
    // }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                   {/*className="bgImage"*/}
                    <div className="bgImage">
                        <Header/>
                        <Switch>
                            <Route path='/Login' exact component={Login}></Route>
                            <Route path='/write' exact component={Write}></Route>
                            <Route path='/resume' exact component={Wwrite}></Route>
                            <Route path='/content/:type' exact component={Content}></Route>
                            <Route path='/content/:type/article/:id' exact component={ArticleModal}></Route>
                        </Switch>
                    </div>

                <Footer />
                </BrowserRouter>
            </Provider>
        );
    }
}


export default App;
