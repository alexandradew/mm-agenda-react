import {createContext, useState, useEffect } from 'react';
import api from '../services/api'
import { useHistory } from 'react-router-dom'


export const AuthContext = createContext([]);

export function AuthContextProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const history = useHistory()

  useEffect(() => {
    checkLogin();
  }, [])

  function checkLogin(){
    const lsToken = localStorage.getItem('MMAgendaToken')
    if(!lsToken){
      history.push('/login')
    }
  }

  async function signIn({ email, password }){
    let response = await api.post('/auth/login/', {
      email,
      password
    })

    localStorage.setItem('MMAgendaToken', response.data.data.token)
    localStorage.setItem('MMAgendaUser', JSON.stringify(response.data.data.user))

    setUser(response.data.data.user);
    setToken(response.data.data.token);

    history.push('/contacts')
    }
  

  async function signOut(){
    await api.post('/auth/logout/')  
    
    localStorage.removeItem('MMAgendaToken')
    localStorage.removeItem('MMAgendaUser')

    setUser(null);
    setToken(null);

    history.push('/login')    
  }

  return(
    <AuthContext.Provider value={{ user: user, signIn: signIn, signOut: signOut, token: token, setToken, setUser: setUser }}>
		 {children}
    </AuthContext.Provider>
  )
}