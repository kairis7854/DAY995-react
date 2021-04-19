import {SAVE_USER_INFO} from '../action_type.js'
import {DELETE_USER_INFO} from '../action_type.js'

let userName = localStorage.getItem('userName')
let pw = localStorage.getItem('pw')


let initState = {
  userName:userName || '',
  pw:pw || '',
  isLogin:userName && pw ? true :false
}

export default function aaa(preState=initState,action){
  const {type,data} = action
  let newState
  switch(type){
    case SAVE_USER_INFO:
      const {userName,pw} = data
      newState = {userName,pw,isLogin:true}
      return newState
    case DELETE_USER_INFO:
      let obj={userName:'',pw:'',isLogin:false}
      newState = obj
      return newState
    default:
      return preState
  }
}