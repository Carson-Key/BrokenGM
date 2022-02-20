const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

export default NotificationReducer
