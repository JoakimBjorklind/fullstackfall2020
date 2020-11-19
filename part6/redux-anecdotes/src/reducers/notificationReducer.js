const notificationReducer =(state = null, action) => {
    switch (action.type) {
        case 'DISPLAY_NOTI':
            let stateCopy = { ...state}
            stateCopy = action.notification
            return stateCopy
     
        case 'UNDISPLAY_NOTI':
                return  null
        default:
            return state   
        }
}

export const displayNotification = (notification) => {
    return {
        type: 'DISPLAY_NOTI',
        notification
    }
}

export const undisplayNotification = (notification) => {
    return {
        type: 'UNDISPLAY_NOTI',
        notification
    }
}

export default notificationReducer