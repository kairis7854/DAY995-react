import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Popconfirm, message } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {deleteUserInfo} from '../../../redux/action/login_action.js'
import dayjs from 'dayjs'
import './top.less'



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
  }

  componentDidMount(){
    this.dataNow = setInterval(()=>{
      this.setState({day:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
    },1000)
  }

  componentWillUnmount(){
    clearInterval(this.dataNow)
  }

  confirm= () => {
    this.props.deleteUserInfo()
    localStorage.removeItem('userName')
    localStorage.removeItem('pw')
    message.success('登出成功');
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
          <p>{dayjs().format('YYYY年MM月DD日 HH:mm:ss')  }</p>
        </div>
      </div>
    )
  }
}
export default Top