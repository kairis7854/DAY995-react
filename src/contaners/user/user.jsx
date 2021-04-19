import React,{Component} from 'react'
import { Table, Tag, Space } from 'antd';

export default class User extends Component{

  render(){
    const columns = [
      {
        title: '帳號',
        dataIndex: 'name',
        key: 'name',
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
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === '超級管理員') {
                color = 'purple';
              }
              if (tag === '產品顧問') {
                color = 'blue';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <div>修改</div>
            <div>刪除</div>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'Admin',
        Email: 'Admin@gmail.com',
        Phone: '0912345678',
        tags: ['超級管理員'],
      },
      {
        key: '2',
        name: 'Youssef',
        Email: 'Youssef@gmail.com',
        Phone: '0911115678',
        tags: ['商品銷售員'],
      },
      {
        key: '3',
        name: 'Paola',
        Email: 'Paola@gmail.com',
        Phone: '0912341111',
        tags: ['產品顧問'],
      },
    ];


    return (
      <div>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    )
  }
}