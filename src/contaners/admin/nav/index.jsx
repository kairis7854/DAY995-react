import React,{Component} from 'react'
import { Menu} from 'antd';
import menu from '../../../config/menu_config.js'
import {Link,withRouter} from 'react-router-dom'
import './nav.less' 

const { SubMenu } = Menu;


@withRouter
class Nav extends Component{

createMenu = (data)=>{
  return data.map((item)=>{
    if(!item.children){
      return (
        <Menu.Item key={item.key} >
          <Link to={item.path}>
            <div>{item.title}</div>
          </Link>
        </Menu.Item>
      )
    }else if(item.children){
      return(
        <SubMenu 
          key={item.key}  
          title={
            <div>
              <div>{item.title}</div>
            </div>
          }>
          {this.createMenu(item.children)}
        </SubMenu>
      )
    }
    return item.id
  })
}

  render(){
    let {pathname} = this.props.location
    return(
      <div className= 'nav'>
        <div className='navTop'>
          商品管理系統
        </div>
        <Menu
          defaultSelectedKeys={pathname.indexOf('product') !== -1? 'product' : pathname.split('/').reverse()[0]}
          defaultOpenKeys={pathname.split('/').splice(2)}
          mode="inline"
          theme="dark"
        >
          {this.createMenu(menu)}
        </Menu>
      </div>
    )
  }
}

export default Nav