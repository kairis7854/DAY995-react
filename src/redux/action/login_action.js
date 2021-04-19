import {SAVE_USER_INFO} from '../action_type.js'
import {DELETE_USER_INFO} from '../action_type.js'

export const saveUserInfo = (value) =>{
  return {type:SAVE_USER_INFO,data:value}
}

export const deleteUserInfo = () =>{
  return {type:DELETE_USER_INFO}
}

