import React, { createContext, useEffect, useState } from 'react'
import { auth, generateUserDocument } from '../utils/firebaseConfig'
import { ToastContainer } from 'react-toastify'

export const Context = createContext()

const Provider = ({ children }) => {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   (async () => {
  //     auth.onAuthStateChanged(async (userAuth) => {
  //       const user = await generateUserDocument(userAuth)
  //       setUser(user)
  //     })
  //   })()
  // }, [])

  return (
    <Context.Provider value={user}>
      {/* <ToastContainer /> */}
      {children}
    </Context.Provider>
  )
}

export default Provider
