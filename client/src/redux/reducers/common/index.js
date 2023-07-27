var initState = {
  open: false,
  time: '',
  message: '',
  title: ''
}

export function errorSnackbar(state = initState, action) {
  switch (action.type) {
    case 'common/error/open': {
      var time = new Date()
      return({...state,
        open : true,
        time : `0${time.getHours()}`.slice(-2) + ':' + `0${time.getMinutes()}`.slice(-2),
        message : action.message,
        title : action.title || 'Неизвестаня ошибка'
      })
    }
    case 'common/error/close' : {
      return({
        open : false,
        time : '',
        message : '',
        title : ''
      })
    }
    default:
      return state
  }
}
