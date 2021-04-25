import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Table, Space,Button,message,Modal,Form,Input } from 'antd';
import { ExclamationCircleOutlined,PlusSquareOutlined  } from '@ant-design/icons';
import data from './data.js'
import {connect} from 'react-redux'
import {savePhoneInfo} from '../../redux/action/phone_action.js'
const { confirm } = Modal;
const { Search } = Input;

@connect(
  state =>({
    phoneInfo:state.phoneInfo
  }),
  {savePhoneInfo:savePhoneInfo}
)
@withRouter
class Phone extends Component{

  formRef = React.createRef()
  state = {
      dataInfo:'',
      searchDataInfo:'',
      upData:'',
      visible:false,
      search:false,
  }

  componentDidMount(){
    if(!this.state.dataInfo) {
      this.setState({dataInfo:data})
    }
  }

  componentDidUpdate(){
    const data = this.formRef.current
    if (data) data.resetFields()
  }

  //狀態修改
  changeStatus= (item)=>{
    let newStatus = !item.status 
    let newDataInfo = this.props.phoneInfo;
    item.status = newStatus

    this.props.savePhoneInfo(newDataInfo)
    message.success('更新狀態成功',.7)
  }

  //規格修改
  handleOk=()=>{
    let formData = this.formRef.current.getFieldsValue();
    if(this.state.search){
      let newSearchDataInfo = [...this.state.searchDataInfo]
      newSearchDataInfo = newSearchDataInfo.map(item=>item.key === formData.key ? {...item,...formData} : item)
      this.setState({searchDataInfo:newSearchDataInfo})
    }
    let newDataInfo = [...this.props.phoneInfo]
    newDataInfo = newDataInfo.map(item=>item.key === formData.key ? {...item,...formData} : item)

    this.setState({visible:false})
    this.props.savePhoneInfo(newDataInfo)
    this.formRef.current.resetFields()
    message.success('修改成功',1)
  }
  handleCancel=()=>{
    this.setState({visible:false})
  }

  //刪除功能
  showDeleteConfirm = (key)=> {
    const _this = this
    confirm({
      title: '注意:',
      icon: <ExclamationCircleOutlined />,
      content: '確定要刪除嗎?',
      okText: '確定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        if(_this.state.search){
          let newSearchDataInfo = [..._this.state.searchDataInfo]
          newSearchDataInfo = newSearchDataInfo.filter(item=>item.key !== key)
          _this.setState({searchDataInfo:newSearchDataInfo})
        }
        let newDataInfo = [..._this.props.phoneInfo]
        newDataInfo = newDataInfo.filter(item=>item.key !== key)
        _this.props.savePhoneInfo(newDataInfo)

        message.success('刪除成功')
      },
    });
  }

  //查詢
  onSearch = (value)=>{
    let smallValue = value=value.toLowerCase()
    let {phoneInfo} = this.props 
    let resArr = [];
    phoneInfo.forEach(item=>{
        if (item.company.toLowerCase().includes(smallValue) || item.type.toLowerCase().includes(smallValue)) resArr.push(item)   
    })

    this.setState({search:true,searchDataInfo:resArr})
  }

  render(){
    const columns = [
      {
        title: '廠牌',
        dataIndex: 'company',
        key: 'company',
        width:50,
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '型號',
        dataIndex: 'type',
        key: 'type',
        width:70,
        textWrap: 'word-break',

      },
      {
        title: '規格',
        dataIndex: 'spec',
        key: 'spec',
        width:150,
        textWrap: 'word-break',
 
      },
      {
        title: '建議售價',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        width:50,
        textWrap: 'word-break',
        ellipsis: true,
        render: price =>'$'+price
      },
      {
        title: '狀態',
        //dataIndex: 'status', 這是設定遍歷的數據!!!
        key: 'status',
        align:'center',
        width:50,
        textWrap: 'word-break',
        ellipsis: true,
        render: (item,index) => {
          return (
            <div>
              <Button 
                type = {item.status === true ? 'danger' : 'primary '} 
                onClick = {()=>{this.changeStatus(item,index)}}
              >
                {item.status === true ? '下架':'上架'}
              </Button><br/>
                <span style={item.status === true ? {color:'green'} : {color:'primary'}}>
                {item.status === true ? '在售':'已停售'}
              </span>
            </div>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        align:'center',
        width:70,
        textWrap: 'word-break',
        ellipsis: true,
        render: (item) => (
          <Space size="middle">
            <Button type='link' size='small' onClick={()=>{this.setState({visible:true,upData:item})}}>修改</Button>
            <Button type='link' size='small' onClick={()=>{this.showDeleteConfirm(item.key)}} >刪除</Button>
          </Space>
        ),
      },
    ];

    let initData = this.state.upData

    return (
      <div>
          <div>    
            <Space direction="vertical" style={{paddingBottom:10}} >
             <Search placeholder="請輸入關鍵字(廠牌,型號)" onSearch={this.onSearch} style={{ width:300 }} />
            </Space>
            <Link to='/admin/prod_about/phone/add' style={{float:'right',fontSize:18,padding:'5px 20px 0px 0px'}}><PlusSquareOutlined />新增商品</Link>
          </div>
        <Table  
          dataSource={this.state.search ? this.state.searchDataInfo : this.props.phoneInfo } 
          columns={columns} bordered page='6'
          pagination={{pageSize:6}}
          rowKey='key'
        />
        <Modal title="修改" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText='確定' cancelText='取消'>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            ref={this.formRef}
          >
            <Form.Item name="key" initialValue ={initData.key} hidden><></></Form.Item>
            <Form.Item
              label="廠牌"
              name="company"
              rules={[{required: true,message: '廠牌不能為空!'}]}
              initialValue ={initData.company}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="型號"
              name="type"
              rules={[{required: true,message: '型號不能為空!'}]}
              initialValue ={initData.type}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="規格"
              name="spec"
              rules={[{required: true,message: '規格不能為空!'}]}
              initialValue ={initData.spec}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="價格"
              name="price"
              rules={[{required: true,message: '價格不能為空!'}]}
              initialValue ={initData.price}
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Phone