import React, {useContext, useEffect} from 'react'
import styles from './Login.module.scss'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../../contexts/AuthContext';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const { signIn, user } = useContext(AuthContext);

  const history = useHistory()
  useEffect(() => {
    if(user !== null){
      history.push('/contacts');
    }
  })

  async function submitLogin(data){
    signIn({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit(submitLogin)}>
        <h2>Faça login para continuar</h2>

          <input type="text" name="email" placeholder="E-mail" 
          {...register("email", { required: "Preencha o email." })}
          onKeyUp={() => {
            trigger("email");
          }}
          />

          {errors.email && (
            <small className={styles.textDanger}>{errors.email.message}</small>
          )}

          <input type="password" name="password" placeholder="Senha" 
          {...register("password", { required: "Preencha a senha." })}
          onKeyUp={() => {
            trigger("password");
          }}
          />

          {errors.password && (
            <small className={styles.textDanger}>{errors.password.message}</small>
          )}

          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default Login
