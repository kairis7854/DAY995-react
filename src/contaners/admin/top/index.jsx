import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Popconfirm, message } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {deleteUserInfo} from '../../../redux/action/login_action.js'
import dayjs from 'dayjs'
import menu_config from '../../../config/menu_config.js'
import PropTypes from 'prop-types'
import {reqWeather} from '../../../api'
import './top.less'
let UNLISTEN 

@connect(
  state=>({
    userInfo:state.userInfo
  }),{
    deleteUserInfo:deleteUserInfo
  }
)
@withRouter
class Top extends Component{

  state={
    day:dayjs().format('YYYY年MM月DD日 HH:mm:ss'),
    location: PropTypes.object.isRequired,
    title:'',
    weather:'',
  }


  componentDidMount(){
    //獲取時間
    this.dataNow = setInterval(()=>{
      this.setState({day:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
    },1000)

    //獲取title
    this.gitTitle()
    UNLISTEN = this.props.history.listen(location => {
      if (this.props.location.pathname !== location.pathname) {
        this.gitTitle()
      }
    })
 
    //獲取天氣
    //this.getWeather()
  }

  componentWillUnmount(){
    //停止獲取時間
    clearInterval(this.dataNow)

    //停止監聽地址
    UNLISTEN && UNLISTEN()
  }


  //登出
  confirm= () => {
    this.props.deleteUserInfo()
    localStorage.removeItem('isLogin')
    message.success('登出成功');
  }

  //獲取title
  gitTitle = ()=>{
    let {pathname} = this.props.history.location
    let titleEng =  pathname.split('/').reverse()[0]
    if(pathname.indexOf('phone') !== -1) titleEng = 'phone'
    let newTitle = ''

    menu_config.forEach((item)=>{
      if(item.children){ 
        let res = item.children.find((citem)=>{
          return citem.key === titleEng
        })
        if(res) {newTitle = res.title;}
      }else{
        if(item.key === titleEng) {newTitle = item.title;}
      }
    })
    this.setState({title:newTitle})
  }

  //獲取天氣
  getWeather = async()=>{
    let res = await reqWeather()
    this.setState({weather:res})
  }

  render(){
    return(
      <div className='top' >
        <div className='topHeader' >
          <p >
            歡迎，{this.props.userInfo.userName}
            <Popconfirm
            title="注 意 : 您 確 定 要 登 出 嗎 ? "
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
            >
              <Link className='link' to='/login'>登出</Link>
            </Popconfirm>  
          </p>
        </div>
        <div className='topBottom'>
          <div className='top-Bottom-left'>{this.state.title}</div>
          <p className='top-Bottom-right'>
            {dayjs().format('YYYY年MM月DD日 HH:mm:ss')}<br/>
            {this.state.weather}
            </p>
        </div>
      </div>
    )
  }
}
export default Top