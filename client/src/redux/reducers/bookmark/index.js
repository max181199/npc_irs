var initState = {
  api: null,
  isApi: false,
  columnApi: null,
  isColumnApi: null,
  updateList: new Set(),
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'bookmark/init': {
      return({
        api: action.api,
        isApi: true,
        columnApi: action.columnApi,
        isColumnApi: true,
        updateList: new Set(),
      })
    }
    case 'bookmark/drop' : {
      return({
        api: null,
        isApi: false,
        columnApi: null,
        isColumnApi: false,
        updateList: new Set(),
      })
    }
    case 'bookmark/addToUpdateList': {
      return({
        ...state,
        updateList: new Set([...state.updateList, ...action.linkList])
      })
    }
    case 'bookmark/addOneToUpdateList': {
      return({
        ...state,
        updateList: state.updateList.add(action.link)
      })
    }
    case 'bookmark/setToUpdateList': {
      return({
        ...state,
        updateList: new Set(...action.linkList)
      })
    }
    default:
      return state
  }
}
