import React,{Component} from 'react'
import { Table, Tag, Space,Button,message,Modal } from 'antd';
import {ExclamationCircleOutlined,PlusSquareOutlined  } from '@ant-design/icons';
import UserAdd from '../user-add/user-add.jsx'
import {connect} from 'react-redux'
import './user.less'
const { confirm } = Modal;

@connect(
  state =>({userInfo:state.userInfo})
  ,{}
)
class User extends Component{
  state={
    visible:false,
    userInfo:'',
  }

  componentDidMount(){
    this.getdata()
  }

  //獲取渲染列表的資料
  getdata =()=>{
    let userInfo = [];
    for(var i=0; i<localStorage.length;i++){
      let res = JSON.parse(localStorage.getItem(localStorage.key(i)))
      if(localStorage.key(i) !== 'isLogin') userInfo.push(res)
    }
    this.setState({userInfo})
  }

  //新增用戶彈窗
  onClick = ()=>{
    this.setState({visible:true})
  }

  //刪除
  onDelete = (item)=>{
    const _this = this
    confirm({
      title: '注意:',
      icon: <ExclamationCircleOutlined />,
      content: '確定要刪除嗎?',
      okText: '確定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        localStorage.removeItem(item.userName)
        _this.getdata()
        message.success('刪除成功')
      },
    });
  }

  setVisible =(bool)=>{
    this.setState({visible:bool})
    this.getdata()
  }

  render(){
    const columns = [
      {
        title: '帳號',
        dataIndex: 'userName',
        key: 'userName',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Email',
        dataIndex: 'Email',
        key: 'Email',
      },
      {
        title: '手機',
        dataIndex: 'Phone',
        key: 'Phone',
      },
      {
        title: '角色',
        key: 'roler',
        dataIndex: 'roler',
        render: roler => (
          <>
            {roler.map(roler => {
              let color = roler.length > 5 ? 'geekblue' : 'green';
              if (roler === "超級管理員") {
                color = 'purple';
              }
              return (
                <Tag color={color} key={roler}>
                  {roler.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
    ];
    if(this.props.userInfo.userName === 'admin'){
      columns.push({
        title: '操作',
        key: 'action',
        render: (item) => (
          <Space size="middle">
              <div>修改</div>
              <Button type='link' onClick={()=>{this.onDelete(item)}} >刪除</Button>
          </Space>
        )
      })
    }
 
    return (
      <div  className='user-wrap'>
        <Button type='link' className='user-Button' onClick={this.onClick}><PlusSquareOutlined/>新增用戶</Button>
        <Table columns={columns} dataSource={this.state.userInfo} bordered pagination={{pageSize:6}}/>
        <UserAdd visible={this.state.visible} setVisible={(bool)=>{this.setVisible(bool)}}/>
      </div>
    )
  }
}
export default User