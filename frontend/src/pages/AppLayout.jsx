import React from 'react'

import { Outlet } from 'react-router-dom'


// const socket = io(import.meta.env.VITE_APP_SOCKET_URL);

const AppLayout = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AppLayout