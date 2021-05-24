// import {SAVE_PHONE_INFO} from '../action_type.js'
import {ADD_LAPTOP_INFO} from '../action_type.js'
import {DELETE_LAPTOP_INFO} from '../action_type.js'
import {UPDATA_LAPTOP_INFO} from '../action_type.js'
import list from '../../contaners/laptop/data.js'

export default function a(preState=list,action){
  const {type,data} = action
  let newState


  switch(type){
    case ADD_LAPTOP_INFO:
      newState = [...preState]
      newState.unshift(data)
      return newState
    case DELETE_LAPTOP_INFO:
      newState = [...preState]
      newState = newState.filter(function(item){
        return item.uid !== data
      })
      return newState
    case UPDATA_LAPTOP_INFO:
      newState = [...preState]
      for(let i = 0;i<newState.length;i++){
        if(newState[i].uid === data.uid){
          newState[i] = data
          break;
        }
      }
      return newState
    default:
      return preState
  }
}