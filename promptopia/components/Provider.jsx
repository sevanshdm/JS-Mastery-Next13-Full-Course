"use client"

import { SessionProvider } from "next-auth/react"

// this is higher order component, meaning it wraps other components with it
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider