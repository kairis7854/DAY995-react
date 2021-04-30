import React,{Component } from 'react'
import { Form, Input,Modal,message } from 'antd';
import {nanoid} from 'nanoid'

class UserAdd extends Component{

  formRef = React.createRef()
 
  
  componentDidUpdate(){
    const data = this.formRef.current
    if (data) data.resetFields()
  }

  handleOk =  async() => {
    let formInfo = await this.formRef.current.validateFields()
    let check = JSON.parse(localStorage.getItem(formInfo.userName))

    if(check && formInfo.userName === check.userName){
      message.error('用戶名已被註冊')
      return
    }else{
      let data = JSON.stringify(formInfo)
      localStorage.setItem(formInfo.userName,data)
      this.props.setVisible(false)
      message.success('用戶註冊成功')
    }
  }
  
  handleCancel =()=>{
    this.props.setVisible(false)
  }

  render(){
    return(
      <Modal title="新增用戶" visible={this.props.visible}  onOk={this.handleOk} onCancel={this.handleCancel} okText='確定' cancelText='取消'>
        <Form
          ref={this.formRef}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item name="key" initialValue ={nanoid()} hidden><></></Form.Item>
          <Form.Item name='roler' initialValue={['商品銷售員']} hidden><></></Form.Item>
          <Form.Item
            label="帳號"
            name="userName"
            rules={[
              {required: true,message: '請輸入帳號名稱!'},
              {max:12, message:'帳號必須是小於等於12位'},
              {min:4, message:'帳號必須是大於等於4位'},
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                message: '請輸入Email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手機"
            name="Phone"
            rules={[
              {
                required: true,
                message: '請輸入手機號碼!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密碼"
            name="password"
            rules={[
              {required: true,message: '請輸入密碼!' },
              {max:12, message:'密碼必須是小於等於12位'},
              {min:4, message:'密碼必須是大於等於4位'},
            ]}
          >
            <Input.Password />
          </Form.Item>  
        </Form>
     </Modal>
   )
  }
}
export default UserAdd