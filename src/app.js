import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './container/login';
import Register from './container/register';
import MoreInfo from './container/moreinfo';
import AuthRoute from './component/authroute';

function manlist(){
  return <h2>男士列表</h2>
}

function womenlist(){
  return <h2>女士列表</h2>
}

class App extends Component{
  render() {
    return (
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/moreinfo' component={MoreInfo}></Route>
          <Route path='/manlist' component={manlist}></Route>
          <Route path='/womenlist' component={womenlist}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
