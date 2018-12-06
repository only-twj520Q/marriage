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

function maninfo(){
  return <h2>继续完善男士信息</h2>
}

function womeninfo(){
  return <h2>继续完善女士信息</h2>
}

function manlist(){
  return <h2>男士列表</h2>
}

function womenlist(){
  return <h2>女士列表</h2>
}

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/maninfo' component={maninfo}></Route>
          <Route path='/womeninfo' component={womeninfo}></Route>
          <Route path='/manlist' component={manlist}></Route>
          <Route path='/womenlist' component={womenlist}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
