import React,{Component} from 'react'
import { Form, Input, Button,message } from 'antd';
import { DoubleLeftOutlined} from '@ant-design/icons';
import {nanoid} from 'nanoid'
import {connect} from 'react-redux'
import {addPhoneInfo} from '../../redux/action/phone_action.js'
import {withRouter,Link} from 'react-router-dom'
import './phone-add.less'

@connect(
  state=>({
    phoneInfo:state.phoneInfo
  }),
  {addPhoneInfo:addPhoneInfo}
)
@withRouter
class PhoneAdd extends Component{

  formRef = React.createRef()

  onFinish = (values) => {
    this.props.addPhoneInfo(values)
    this.formRef.current.resetFields()
    console.log()
    message.success('新增成功')
  };

  onFinishFailed = (errorInfo) => {
    message.error('表單輸入有誤')
  }

  render(){

    return (
      <div className = 'add'>
        <Link to='/admin/prod_about/phone' className='link'><DoubleLeftOutlined />返回</Link>
        <Form
          ref={this.formRef}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <p>商品新增</p>
          <Form.Item name="status" initialValue ={false} hidden><></></Form.Item>
          <Form.Item name="key" initialValue ={nanoid()} hidden><></></Form.Item>
          <Form.Item
            label="廠牌"
            name="company"
            rules={[{ required: true, message: '請輸入廠牌!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="型號"
            name="type"  
            rules={[{ required: true, message: '請輸入型號!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="價格"
            name="price"
            rules={[{ required: true, message: '請輸入價格' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="規格"
            name="spec"
            rules={[{ required: true, message: '請輸入規格!' }]}
          >
            <Input.TextArea  rows={4}/>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
        
      </div>
    )
  }
}

export default PhoneAdd