const notificationReducer =(state = null, action) => {
    switch (action.type) {
        case 'DISPLAY_NOTI':
           
            return action.data
     
        case 'UNDISPLAY_NOTI':
                return  null
        default:
            return state   
        }
}

export const displayNotification = (notification, seconds) => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY_NOTI',
            data: notification
    })

       setTimeout(() => {
           dispatch({
               type: 'UNDISPLAY_NOTI'
           })
       }, seconds * 1000)
    }
}

export const undisplayNotification = (notification) => {
    return {
        type: 'UNDISPLAY_NOTI',
        notification
    }
}

export default notificationReducer