import actions from "../../actions"
import reduxFunction from "../index"

function openError(message, title){
  return function(dispatch, getState){
    dispatch(actions.common.openError(message, title))
  }
}

function closeError(){
  return function(dispatch, getState){
    dispatch(actions.common.closeError())
  }
}

export default {
  openError,
  closeError
}