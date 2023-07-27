function openError(message = 'Описание отсутствует', title = 'Неизвестная ошибка'){
  return({
    message,
    title,
    type: 'common/error/open'
  })
}

function closeError(){
  return({
    type: 'common/error/close'
  })
}

export default {
  openError,
  closeError
}