import actions from "../../actions"
import reduxFunction from "../index"

function init(api){
  return function(dispatch, getState){
    dispatch(actions.book.init(api))
  }
}

function reset(){
  return function(dispatch, getState){
    dispatch(actions.book.drop())
  }
}

function setDatasource(){
  return function(dispatch, getState){
    var {api, isApi} = getState().book
    if(!isApi) return
    const dataSource = {
      rowCount: 0,
      getRows: (params) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "startRow": params.startRow,
          "endRow": params.endRow,
          "sort": params.sortModel
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch("http://localhost:30001/book/get", requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.error){
              dispatch(reduxFunction.common.openError(data.message, data.title))
              return
            } 
            params.successCallback(data);
          })
          .catch(error => dispatch(reduxFunction.common.openError(error.message, 'Неизвестная ошибка'))
        );
      }
    }
    api.setDatasource(dataSource)
    return
  }
}

export default {
  init,
  reset,
  setDatasource,
}