import React, { useContext, useEffect } from 'react'
import styles from './Header.module.scss'

import { FaUserCircle } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

import { AuthContext } from '../../contexts/AuthContext';


function Header() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {

  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>MM AGENDA</h1>
        {true ? 
        <div>     
          <span><FaUserCircle/> Olá, {user?.username} </span>        
          <span onClick={signOut}><MdLogout/> Sair </span>
        </div>
        : ''}
      </div>
    </header>
  )
}

export default Header
