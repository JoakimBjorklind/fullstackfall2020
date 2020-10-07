import React from 'react'


const Notification = ({ messageMessage, errorMessage }) => {
    if (errorMessage === null && messageMessage === null) {
      return null
    }
    else if (messageMessage !== null)
    {
      return (
        <div className="messageMessage">
          {messageMessage}
        </div>
      )
    }
    else if(errorMessage !== null)
    {return (
      <div className="errorMessage">
        {errorMessage}
      </div>
    )
    }
  }
  

  export default Notification
