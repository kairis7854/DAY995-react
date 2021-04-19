import React,{Component} from 'react'
import { Empty } from 'antd';

export default class Laptop extends Component{

  render(){

    return (
      <Empty style={{margin:'100px auto',}} description='暫無商品'/>
    )
  }
}