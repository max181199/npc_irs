var initState = {
  api: null,
  isApi: false,
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'book/init': {
      return({
        api: action.api,
        isApi: true,
      })
    }
    case 'book/drop' : {
      return({
        api: null,
        isApi: false,
      })
    }
    default:
      return state
  }
}
