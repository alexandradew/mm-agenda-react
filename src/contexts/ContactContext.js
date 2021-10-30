import {createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api'

import { AuthContext } from './AuthContext';
export const ContactContext = createContext([]);

export function ContactContextProvider({ children }){
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([])

  useEffect(() => {
      getContacts();    
  }, [])

  async function getContacts(){
    api.get('/contacts')
    .then(res => setContacts(res.data))
  }

	function handleContacts(data){
    setContacts(data);
	}

  return(
    <ContactContext.Provider value={{ contacts: contacts, handleContacts: handleContacts, getContacts: getContacts }}>
		 {children}
    </ContactContext.Provider>
  )
}