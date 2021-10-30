import React, {useState, useContext, useEffect} from 'react'
import styles from './Login.module.scss'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../../contexts/AuthContext';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const { isLoggedIn, signIn, user } = useContext(AuthContext);

  const history = useHistory()
  useEffect(() => {
    if(user !== null){
      history.push('/contacts');
    }
  })

  function handleChange(e){
    setLogin({...login, [e.target.name]: e.target.value})
  }

  async function submitLogin(e){
    e.preventDefault();
    signIn(login);
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <form onSubmit={submitLogin}>
        <h2>Faça login para continuar</h2>
          <input type="text" name="email" placeholder="E-mail" 
          onChange={(e) => handleChange(e)}
          value={login.email}          
          />
          <input type="password" name="password" placeholder="Senha" 
          onChange={(e) => handleChange(e)}
          value={login.password}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default Login
