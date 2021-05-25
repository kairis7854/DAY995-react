import React,{useState} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {Modal,Button, message, Input} from 'antd';
import {PlusSquareOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import LaptopAdd from '../laptop-add/laptop-add.jsx'
import {nanoid} from 'nanoid'
import {ADD_LAPTOP_INFO} from '../../redux/action_type.js'
import {DELETE_LAPTOP_INFO} from '../../redux/action_type.js'
import {UPDATA_LAPTOP_INFO} from '../../redux/action_type.js'
import errPic from './errPic'
import './laptop.less'
const { confirm } = Modal;
const { Search } = Input;


const Laptop = () =>{
  
  const data = useSelector(state => state.laptopInfo)
  const dispatch = useDispatch();
  const [visible,setVisible] = useState(false)
  const [title,setTitle] = useState()
  const [search,setSearch] = useState({state:false,key:''})
  const [lapTop,setLapTop] = useState({imageUrl:'',name:'',price:''})
  let sampleValue = {imageUrl:'',name:'',price:''}

  //獲取表單臨時數據
  const getFormData = (imageUrl,name,price)=>{
    sampleValue = {imageUrl:imageUrl,name:name,price:price}
  }

  //新增商品
  const add = () => {
    setTitle('新增')
    setVisible(true)
  }

  //刪除商品
  const showDeleteConfirm = (item) =>{
    confirm({
      title: '注意:',
      icon: <ExclamationCircleOutlined />,
      content: '確定要刪除嗎?',
      okText: '確定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type:DELETE_LAPTOP_INFO,
          data:item.uid,
        })
        message.success('刪除成功')
      },
    });
  }

  //修改商品
  const upData = (item) => {
    setLapTop(item)
    setTitle('修改')
    setVisible(true)
  }

  //設置查詢
  const onSearch = (item) =>{
    if(item === ''){
      setSearch({state:false,key:''})
    }else{
      setSearch({state:true,key:item})
    }
  }
  const searchValue = (item) =>{
    if(search.state === false) return true
    else if( item.name.toLocaleLowerCase().includes(search.key.toLocaleLowerCase())) return true
    else return false
  }


  //操作
  const handleOk = () =>{
    if(title === '新增'){
      let createId = {uid:nanoid(),status: 'done'}
      sampleValue = {...sampleValue,...createId}
      dispatch({
        type:ADD_LAPTOP_INFO,
        data:sampleValue,
      })
    }else if(title === '修改'){
      sampleValue = {...lapTop,...sampleValue}
      dispatch({
        type:UPDATA_LAPTOP_INFO,
        data:sampleValue,
      })
    }
    setLapTop(() => {return {imageUrl:'',name:'',price:'',uid:'',status:''}})
    sampleValue = {imageUrl:'',name:'',price:'',uid:'',status:''}
    message.success(`${title}成功`)
    setVisible(false)
  }

  //取消
  const handleCancel = () =>{
    setLapTop({imageUrl:'',name:'',price:'',uid:'',status:''})
    sampleValue = {imageUrl:'',name:'',price:'',uid:'',status:''}
    setVisible(false)
  }

  return(
    <div className='laptop-wrap'>
      <div className='laptop-top'>
        <Search placeholder="請輸入關鍵字(廠牌,型號)" onSearch={onSearch} className='laptop-search'/>
        <Button type='link' onClick={add}><PlusSquareOutlined/>新增商品</Button>
      </div>
      <div className='laptop-content'>
        <ul className='laptop-ul'>
          {
            data.map((item,index)=>{
              if(searchValue(item)){
                return(
                  <li key={index} className='laptop-li'>
                      <div className='laptop-img'>
                        <img src={item.imageUrl || errPic} alt='img' />
                      </div>
                      <p >{item.name}</p>
                      <p>網路價：{item.price}</p>
                      <Button onClick={()=>{upData(item)}}>修改</Button>
                      <Button onClick={()=>{showDeleteConfirm(item)}}>刪除</Button>
                  </li>
                )
              }else{
                return null
              }
            })
          }
        </ul>
      </div>
      <Modal title={`${title}商品`} visible={visible} onOk={()=>{handleOk()}} onCancel={handleCancel} okText='確定' cancelText='取消'>
        <LaptopAdd visible={visible} getFormData={getFormData} lapTop={lapTop}/>
      </Modal>
    </div>
  )
}

export default Laptop

