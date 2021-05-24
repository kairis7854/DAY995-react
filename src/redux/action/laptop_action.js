// import {SAVE_PHONE_INFO} from '../action_type.js'
import {DELETE_LAPTOP_INFO} from '../action_type.js'
import {ADD_LAPTOP_INFO} from '../action_type.js'
import {UPDATA_LAPTOP_INFO} from '../action_type.js'

export const updataLaptopInfo = (value) =>{
  return {type:UPDATA_LAPTOP_INFO,data:value}
}

export const deleteLaptopInfo = (value) =>{
  return {type:DELETE_LAPTOP_INFO,data:value}
}

export const addLaptopInfo = (value) =>{
  return {type:ADD_LAPTOP_INFO,data:value}
}
