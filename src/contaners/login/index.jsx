import React,{Component} from 'react'
import { Form, Input, Button, message } from 'antd';
import {connect} from 'react-redux'
import {saveUserInfo} from '../../redux/action/login_action.js'
import './css/login.less'

@connect(
  state =>({
    userInfo:state.userInfo
  }),
  {
    saveUserInfo:saveUserInfo
  }
)
class Login extends Component{
  

  onFinish = (values) => {
    //密碼驗證
    const adminCheck = {userName:'admin',pw:'admin'}
 
    if(values.userName && values.pw === adminCheck.userName && adminCheck.pw) {
      this.props.saveUserInfo(values);
      localStorage.setItem('userName',values.userName)
      localStorage.setItem('pw',values.pw)
      this.props.history.replace('/admin')
    }else{
      message.error('表单输入有误，请检查！')
    }
  }

  onFinishFailed = () => {
    message.error('表单输入有误，请检查！',1)
  };

  render(){
    return(
      <div className='login'>
        <header>
          商品管理系統
        </header>
        <div>
          <p>登錄</p>
          <Form name="basic" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
            <Form.Item
              label="姓名"
              name="userName"
              rules={[      
                {max:12, message:'用戶名必須是小於等於12位'},
                {min:4, message:'用戶名必須是大於等於4位'},
                {pattern: /^\w+$/, message: '用户名必须是字母、数字、下划线组成'}
              ]}
            >
              <Input placeholder="用戶名"/>
            </Form.Item>
            <Form.Item
              label="密碼"
              name="pw"
              rules={[ {max:12, message:'密碼必須是小於等於12位'},
              {min:4, message:'密碼必須是大於等於4位'},
              {pattern: /^\w+$/, message: '密碼必须是字母、数字、下划线组成'}]}
            >
              <Input.Password placeholder="密碼"/>
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login