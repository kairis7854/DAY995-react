import {SAVE_PHONE_INFO} from '../action_type.js'
import {DELETE_PHONE_INFO} from '../action_type.js'
import {ADD_PHONE_INFO} from '../action_type.js'

export const savePhoneInfo = (value) =>{
  return {type:SAVE_PHONE_INFO,data:value}
}

export const deletePhoneInfo = (value) =>{
  return {type:DELETE_PHONE_INFO,data:value}
}

export const addPhoneInfo = (value) =>{
  return {type:ADD_PHONE_INFO,data:value}
}
