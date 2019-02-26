//应用根组件
import React,{Component} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

//引用其他组件
import Login from './pages/login/index';
import Admin from './pages/admin/index';

export default class App extends Component{
  render(){
    return(
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Admin}/>
      </Switch>
    </BrowserRouter>
    )
  }
}