import {SAVE_PHONE_INFO} from '../action_type.js'
import {DELETE_PHONE_INFO} from '../action_type.js'
import {ADD_PHONE_INFO} from '../action_type.js'
import data from '../../contaners/phone/data.js'


export default function a(preState=data,action){
  const {type,data} = action

  let newState
  switch(type){
    case SAVE_PHONE_INFO:
      newState =[...data]
      return newState
    case DELETE_PHONE_INFO:
      newState = ''
      newState = [...data]
      return newState
    case ADD_PHONE_INFO:
      newState = [...preState]
      newState.unshift(data)
      return newState
    default:
      return preState
  }
}