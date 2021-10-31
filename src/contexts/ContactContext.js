import {createContext, useState, useEffect } from 'react';

import api from '../services/api'

export const ContactContext = createContext([]);

export function ContactContextProvider({ children }){
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