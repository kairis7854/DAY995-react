import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Login from './contaners/login'
import Admin from './contaners/admin'
import './App.less';
import { Router } from 'express';

export default class App extends Component{
  render(){
    return(
      <div className='app'>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/admin' component={Admin}/>
            <Redirect to='/admin/home'/>
          </Switch> 
      </div>
    )
  }
}