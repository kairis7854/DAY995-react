import React,{useState,useEffect} from "react";
import { Upload, message,Input } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './laptop-add.less'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('圖片類型限制為JPG與PNG檔');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('檔案大小必須小於 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const LaptopAdd = (props) => {
  const [loading,setLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState()
  const [name,setName] = useState()
  const [price,setPrice] = useState()

  //傳遞數據給父組件
  useEffect(
    ()=>{
      props.getFormData(imageUrl,name,price)
    }
    ,[imageUrl,name,price]
  )
 
  //獲取父組件傳遞過來待修改的數據
  useEffect(
    ()=>{
      setImageUrl(props.lapTop.imageUrl)
      setName(props.lapTop.name)
      setPrice(props.lapTop.price)
    }
    ,[props.lapTop]
  )

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>{
        setLoading(false)
        setImageUrl(imageUrl)
        }
      );
    }
  };

  //獲取input框值
  const changeName = (e) => {
    setName(e.target.value)
  }
  const changePrice = (e) => {
    setPrice(e.target.value)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <form className='LaptopAdd-wrap'>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <p>商品：<Input type="text" className='LaptopAdd-input' value={name} onChange={changeName.bind(this)} /></p>
        <p>價格：<Input type="text" className='LaptopAdd-input' value={price} onChange={changePrice.bind(this)}/></p>
    </form>
  );
}

export default LaptopAdd