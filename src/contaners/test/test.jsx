import React,{Component} from 'react'
import {Row,Col,Form,Input,Button } from 'antd'
import './test.less'

export default class Test extends Component{
DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
onFinishFailed =()=>{
 
}
  render(){
    return (
      <div >
        {}
        <Row gutter={0} justify="space-around" align="middle" className='Row'> 
          <Col xs={20} sm={14} md={10} lg={8} xl={6} xxl={4}  className='Col'>
            <Form
              className='Form'
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinishFailed ={this.onFinishFailed }
            >
              <Form.Item
             
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>   

              <Form.Item   >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}