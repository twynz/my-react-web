import React, {Component} from 'react';
import Header from './common/header';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route} from 'react-router-dom';
import './statics/iconfont/iconfont';
import Login from './common/login';
import Write from './write';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                        <Route path='/'></Route>
                        <Route path='/Login' exact component={Login}></Route>
                        <Route path='/write' exact component={Write}></Route>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
