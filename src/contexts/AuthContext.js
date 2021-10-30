import {createContext, useState, useEffect } from 'react';
import api from '../services/api'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

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
    try{      
      let response = await api.post('/auth/login/', {
        email,
        password
      })

      if(response.status === 200) {
        localStorage.setItem('MMAgendaToken', response.data.data.token)
        localStorage.setItem('MMAgendaUser', JSON.stringify(response.data.data.user))
    
        setUser(response.data.data.user);
        setToken(response.data.data.token);
  
        history.push('/contacts')
        toast.success('Login bem sucedido')
      }
    }catch(err){
      toast.error('Email ou senha incorretos')
    }
  }  

  async function signOut(){
    await api.post('/auth/logout/')  
    
    localStorage.removeItem('MMAgendaToken')
    localStorage.removeItem('MMAgendaUser')

    setUser(null);
    setToken(null);

    history.push('/login')
    toast.success('Logout bem sucedido')    
  }

  return(
    <AuthContext.Provider value={{ user: user, signIn: signIn, signOut: signOut, token: token, setUser: setUser }}>
		 {children}
    </AuthContext.Provider>
  )
}