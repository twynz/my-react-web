import React, {Component} from 'react';
import Header from './common/header';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './statics/iconfont/iconfont';
import Login from './common/login';
import Write from './write';
import Home from './home';
import Detail from './detail/Detail';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css';
import Footer from "./common/footer";

const allowedPath = ['/Login', 'write', '/', /^\/detail\/[0-9]+/];


class App extends Component {

    // checkIsMatchedPath() {
    //     console.log('!!!!!!!!!!!');
    //     let currentPath = window.location.pathname;
    //     console.log('enter into switch, cuurent path is ' + currentPath);
    //     let result = allowedPath.filter(obj => {
    //         console.log('current constructor name is' + obj.constructor.name);
    //         if (obj.constructor.name === 'String') {
    //             console.log('is match string' + (obj === currentPath));
    //             return obj === currentPath;
    //         } else {
    //             console.log('is match regex' + obj.test(currentPath));
    //             return obj.test(currentPath);
    //         }
    //     });
    //     if (result.size > 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //
    // }
    //
    // defaultRedirectToHome() {
    //     console.log('redirect to home called');
    //     return <Redirect to='/'/>
    // }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>

                    <div className="bgImage">
                        <Header/>
                        <Switch>
                            <Route path='/' exact component={Home}></Route>
                            <Route path='/Login' exact component={Login}></Route>
                            <Route path='/write' exact component={Write}></Route>
                            <Route path='/detail/:id' exact component={Detail}></Route>
                            <Redirect to="/"/>
                        </Switch>
                        <Footer />
                    </div>


                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
