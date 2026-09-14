import React from 'react'
import { createContext } from 'react'
export const authDataContext = createContext()
  let serverUrl = "https://mystyle-backend.onrender.com"

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
