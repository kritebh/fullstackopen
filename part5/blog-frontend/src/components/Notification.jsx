import React from 'react'

function Notification({notification:{type,message}}) {
  return (
    <div className={`notify ${type}` }>
        {message}
    </div>
  )
}

export default Notification