import actions from "../../actions"
import reduxFunction from "../index"

function init(api, columnApi){
  return function(dispatch, getState){
    dispatch(actions.bookmark.init(api, columnApi))
  }
}

function reset(){
  return function(dispatch, getState){
    dispatch(actions.bookmark.drop())
  }
}

function setDatasource(){
  return function(dispatch, getState){
    var {api, isApi} = getState().bookmark
    if(!isApi) return
    const dataSource = {
      getRows: (params) => {
        //console.log('asking for ' + params.startRow + ' to ' + params.endRow);
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

        fetch("http://localhost:30001/bookmark/get", requestOptions)
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

function add(){
  return function(dispatch, getState){
    var {columnApi, api, isApi, isColumnApi} = getState().bookmark
    if(!isColumnApi || !isApi) return

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch("http://localhost:30001/bookmark/insert", requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.error){
          dispatch(reduxFunction.common.openError(data.message, data.title))
          return
        }
        var sort = columnApi.getColumnState()[0].sort
        if (sort === 'desc'){
          api.purgeInfiniteCache();
        } else {
          columnApi.applyColumnState({
            state: [
              { colId: 'id', sort: 'desc'},
            ],
            defaultState: { sort: null },
          });
        }
      })
      .catch(error => dispatch(reduxFunction.common.openError(error.message, 'Неизвестная ошибка')))
  }
}

function drop(){
  return async function(dispatch, getState){
    var {api, isApi} = getState().bookmark
    if(!isApi) return
    var rows = api.getSelectedRows()
    if(!rows.length) return
    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      for (let idx = 0; idx < rows.length; idx++) {
        var resJSON = await fetch("http://localhost:30001/bookmark/drop?" + new URLSearchParams({
          id: rows[idx].id,
        }), requestOptions)
        var res = await resJSON.json()
        if(res.error){
          dispatch(reduxFunction.common.openError(res.message, res.title))
          break
        }
      }
    } catch (error) {
      dispatch(reduxFunction.common.openError(error.message, 'Неизвестная ошибка'))
    }
    api.purgeInfiniteCache();
    return
  }
}

function addIdToUpdateList(dateLink){
  return function(dispatch, getState){
    dispatch(actions.bookmark.addOneToUpdateList(dateLink))
  }
}

function update(){
  return async function(dispatch, getState){
    var {api, isApi} = getState().bookmark
    if(!isApi) return
    var updateList = [...getState().bookmark.updateList]
    dispatch(actions.bookmark.setToUpdateList([]))
    var error = {
      title: '',
      message: '',
      isError: false,
    }
    for (let list of updateList) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(list);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        var resJson = await fetch("http://localhost:30001/bookmark/update", requestOptions)
        var res = await resJson.json()
        if (res.error){
          error['title'] = res.title
          error['message'] = error.message !== '' ? error.message + '\n' + `${list.id}:: ` + res.message : `${list.id}:: ` + res.message
          error['isError'] = true
          continue
        }
      } catch (error) {
        dispatch(reduxFunction.common.openError(error.message, 'Неизвестная ошибка'))
      }
    }
    if (error.isError) dispatch(reduxFunction.common.openError(error.message, error.title))
    api.purgeInfiniteCache();
  }
}

export default {
  init,
  reset,
  drop,
  setDatasource,
  add,
  addIdToUpdateList,
  update,
}