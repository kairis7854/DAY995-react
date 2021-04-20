import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Login from './contaners/login'
import Admin from './contaners/admin'
import './App.less';

export default class App extends Component{
  render(){
    return(
      <div className='app'>
        <Switch>
          <Route path='/login' component={Login} basename={ process.env.PUBLIC_URL }/>
          <Route path='/admin' component={Admin} basename={ process.env.PUBLIC_URL }/>
          <Redirect to='/admin/home' basename={ process.env.PUBLIC_URL }/>
        </Switch>
      </div>
    )
  }
}