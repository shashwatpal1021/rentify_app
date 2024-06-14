"use client"

import { createContext, useContext,useState } from "react"



// create context

const GlobalContext = createContext();

// create a Provider

export function GlobalProvider({ children }) {
  const [unread, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{
      unread,setUnreadCount
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
export function useGlobalContext() {
  return useContext(GlobalContext)
}