import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';

import Login from './container/login'
import Register from './container/register'

// 生成store
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

function man(){
  return <h2>男人</h2>
}

function women(){
  return <h2>女人</h2>
}

function Dashboard(){
  return <h2>哈哈</h2>
}

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
