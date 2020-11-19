const beginningState = ''
const filterReducer = (state = beginningState, action) => {
    switch (action.type) {
      case 'SET_FILTER':
          let stateCopy = { ...state}
          stateCopy = action.content
        return stateCopy
      default:
        return state
    }
  }
  
  export const setFilter = (content) => {
    return { 
        type: 'SET_FILTER',
        content,
    }
  }
  
  export default filterReducer