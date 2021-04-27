import React,{Component} from 'react'
import { Row,Col,Form, Input, Button, message } from 'antd';
import {connect} from 'react-redux'
import {saveUserInfo} from '../../redux/action/login_action.js'
import './css/login.less'

@connect(
  state =>({}),
  {
    saveUserInfo:saveUserInfo
  }
)
class Login extends Component{

  onFinish = (values) => {
    //簡易密碼驗證
    const adminCheck = {userName:'admin',pw:'admin'}
 
    if(values.userName === adminCheck.userName && values.pw === adminCheck.pw) {
      this.props.saveUserInfo(values);
      localStorage.setItem('userName',values.userName)
      localStorage.setItem('pw',values.pw)
      message.success('登錄成功')
      this.props.history.replace('/admin')
    }else{
      message.error('表單輸入有錯誤，請檢察！')
    }
  }

  onFinishFailed = () => {
    message.error('表單輸入有錯誤，請檢察！',1)
  };

  render(){
    return(
      <div className='login'>
        <header>
          商品管理系統
        </header>
        <Row  justify="space-around" align="middle" className='Row'> 
          <Col xs={18} sm={12} md={10} lg={8} xl={6} xxl={4}  className='Col'> 
            <p>登錄</p>
            <Form name="basic"  onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
              <Form.Item
                label="姓名"
                name="userName"
                rules={[      
                  {max:12, message:'用戶名必須是小於等於12位'},
                  {min:4, message:'用戶名必須是大於等於4位'},
                  {pattern: /^\w+$/, message: '用戶名必須是字母、數字、下滑線组成'}
                ]}
              >
                <Input placeholder="用戶名"/>
              </Form.Item>
              <Form.Item
                label="密碼"
                name="pw"
                rules={[ {max:12, message:'密碼必須是小於等於12位'},
                {min:4, message:'密碼必須是大於等於4位'},
                {pattern: /^\w+$/, message: '用戶名必須是字母、數字、下滑線组成'}]}
              >
                <Input.Password placeholder="密碼"/>
              </Form.Item>
              <Form.Item className='Button' >
                <Button  type="primary" htmlType="submit" >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Login