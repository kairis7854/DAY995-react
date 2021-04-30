import React,{Component} from 'react'
import { Layout } from 'antd';
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from '../../components/home/home.js'
import Phone from '../phone/phone'
import Laptop from '../laptop/laptop'
import User from '../user/user'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import Nav from './nav'
import Top from './top'
import PhoneAdd from '../phone-add/phone-add'
import {connect} from 'react-redux'
import './css/admin.less'

const { Header, Sider, Content } = Layout;

@connect(
  state => ({userInfo:state.userInfo}),
  {}
)
class Admin extends Component{
  
  render(){
    const {isLogin} = this.props.userInfo
    if(!isLogin) return <Redirect to="/login"/>
    return(
      <div className='wrap'>
        <Layout className='Layout'>
          {/* 菜單 */}
          <Sider >
           <Nav/>
          </Sider>
          <Layout  className='right'>
            {/* 頂部 */}
            <Header className='top'>
              <Top/>
            </Header>
            {/* 內容 */}
            <Content className="content">
              <Switch>
                <Route path='/admin/home' component={Home}/>
                <Route path='/admin/prod_about/phone' component={Phone} exact/>
                <Route path='/admin/prod_about/laptop' component={Laptop}/>
                <Route path='/admin/prod_about/phone/phone-add' component={PhoneAdd}/>
                <Route path='/admin/user' component={User}/>
                <Route path='/admin/charts/bar' component={Bar}/>
                <Route path='/admin/charts/line' component={Line}/>
                <Route path='/admin/charts/pie' component={Pie}/>
                <Redirect to='/admin/home'/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Admin