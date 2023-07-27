function init(api, columnApi){
  return({
    api,
    columnApi,
    type: 'bookmark/init'
  })
}

function drop(){
  return({
    type: 'bookmark/drop'
  })
}

function addToUpdateList(linkList){
  return({
    type: 'bookmark/addToUpdateList',
    linkList
  })
}

function addOneToUpdateList(link){
  return({
    type: 'bookmark/addOneToUpdateList',
    link
  })
}

function setToUpdateList(linkList){
  return({
    type: 'bookmark/setToUpdateList',
    linkList
  })
}


export default {
  init,
  drop,
  addToUpdateList,
  addOneToUpdateList,
  setToUpdateList
}
