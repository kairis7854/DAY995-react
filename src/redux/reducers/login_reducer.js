import {SAVE_USER_INFO} from '../action_type.js'
import {DELETE_USER_INFO} from '../action_type.js'




let userName = JSON.parse(localStorage.getItem("isLogin"))
let password = JSON.parse(localStorage.getItem("isLogin"))

let initState = {
  userName:userName ? userName.userName : '',
  password:password ? password.password :'',
  isLogin:userName && password ? true :false,
}

export default function aaa(preState=initState,action){

  const {type,data} = action
  let newState
  switch(type){
    case SAVE_USER_INFO:
      const {userName,password} = data
      newState = {userName,password,isLogin:true}
      return newState
    case DELETE_USER_INFO:
      let obj={userName:'',password:'',isLogin:false}
      newState = obj
      return newState
    default:
      return preState
  }
}