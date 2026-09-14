import React from 'react'
import { createContext } from 'react'
export const authDataContext = createContext()
  let serverUrl = "http://localhost:8000"

function AuthContext({children}) {

    let value = {
         serverUrl
    }
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
