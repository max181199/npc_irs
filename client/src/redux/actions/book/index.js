function init(api){
  return({
    api,
    type: 'book/init'
  })
}

function drop(){
  return({
    type: 'book/drop'
  })
}



export default {
  init,
  drop,
}
