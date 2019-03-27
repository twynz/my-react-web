import React, {Component} from 'react';
import Header from './common/header';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route} from 'react-router-dom';
import './statics/iconfont/iconfont';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Header>
                        <Route path='/' ></Route>
                    </Header>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
