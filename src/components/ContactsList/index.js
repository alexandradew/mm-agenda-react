import React, { useState, useEffect, useContext } from 'react'
import styles from './ContactsList.module.scss'
import api from '../../services/api'

import { FiEdit } from 'react-icons/fi'
import { AiTwotoneDelete } from 'react-icons/ai'
import{ BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs'

import { useHistory } from 'react-router-dom'
import { ContactContext } from '../../contexts/ContactContext';

import { toast } from 'react-toastify';

function ContactsList() {
	const { contacts, handleContacts, getContacts} = useContext(ContactContext)

  const [currentSort, setCurrentSort] = useState({
    type: 'DEFAULT',
    field: 'NONE'
  })

  function sortColumn(field){

    let newSort = contacts.sort(function(a, b){

      if(field === 'Name'){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
      }
      if(field === 'Email'){
        var nameA=a.email.toLowerCase(), nameB=b.email.toLowerCase();
      } 
      if(field === 'Cellphone'){
        var nameA=a.cellphone.toLowerCase(), nameB=b.cellphone.toLowerCase();
      } 

      if(currentSort.field === field && currentSort.type === 'ASCENDING'){
        if (nameA > nameB) // ascending
        return -1;
       if (nameA < nameB)
        return 1;
       return 0; //default (no sorting)
      }else{        
        if (nameA < nameB) // ascending
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; //default value (no sorting)
      }
     });

     let type = ''
     if(currentSort.type === 'ASCENDING'){
        type = 'DESCENDING'
      } else{
      type = 'ASCENDING'
     }

     setCurrentSort({
      type: type,
      field: field,
    })
     
    handleContacts(newSort)
  }

  useEffect(() => {
    getContacts()    
  }, [])

  const history = useHistory();

  function handleEdit(contactId){
    history.push('/contacts/edit/' + contactId)
  }

  async function handleDelete(id){
    let response = await api.delete('/contacts/' + id)
    if(response.status === 200){
      await api.get('/contacts')
      getContacts();
      toast.success("Contato deletado.");
    }
  }
 
  return (
    <div className={styles.tableContainer} style={{overflowX: 'auto'}}>
    {contacts?.length > 0 ? 
    <table cellSpacing="0" cellPadding="0">
      <thead>
        <tr>
          <th onClick={() => sortColumn('Name')}>
            <span>
            Nome 
            {currentSort.field === 'Name' && currentSort.type === 'ASCENDING' ? <BsArrowUpShort /> : <BsArrowDownShort />}
            </span>
          </th>
          <th onClick={() => sortColumn('Email')}>
            <span>
            E-mail 
            {currentSort.field === 'Email' && currentSort.type === 'ASCENDING' ? <BsArrowUpShort /> : <BsArrowDownShort />}
            </span>
          </th>
          <th onClick={() => sortColumn('Cellphone')}>
            <span>
            Telefone
            {currentSort.field === 'Cellphone' && currentSort.type === 'ASCENDING' ? <BsArrowUpShort /> : <BsArrowDownShort />}
            </span>
          </th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {contacts?.map((contact, idx) => {
          return (
          <tr key={contact.id}>
            <td>{contact.name} {contact.lastname}</td>
            <td>{contact.email}</td>
            <td>{contact.cellphone}</td>
            <td className={styles.actions}>
            <FiEdit size={20} onClick={() => handleEdit(contact.id)}/> 
            <AiTwotoneDelete size={20} onClick={() => handleDelete(contact.id)}/> 
            </td>
          </tr>
          )
        })}
  
      </tbody>
    </table>
    : "Ops, parece que você ainda não adicionou nenhum contato."}
    </div>
  )
}

export default ContactsList
