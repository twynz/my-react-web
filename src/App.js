import React, {Component} from 'react';
import Header from './common/header';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route} from 'react-router-dom';
import './statics/iconfont/iconfont';
import Login from './common/login';
import Write from './write';
import Home from './home';
import Detail from './detail/Detail';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/Login' exact component={Login}></Route>
                    <Route path='/write' exact component={Write}></Route>
                    <Route path='/detail/:id' exact component={Detail}></Route>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
