import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './NewContact.module.scss'
import Header from '../../../components/Header'

import api from '../../../services/api'
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import { IoChevronBackOutline } from 'react-icons/io5'

import { ContactContext } from '../../../contexts/ContactContext'

export default function NewContact() {
  const {  getContacts } = useContext(ContactContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

 
  const history = useHistory()
  async function submitData(data){
    await api.post('/contacts', {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      cellphone: data.cellphone,
    })
    //getContacts();
    reset();       
    history.push('/contacts');
  }

  return (
      <>
      <Header/>
      <div className={styles.newContactContainer}>
        <button onClick={() => history.goBack()}>
          <IoChevronBackOutline />
        </button>
        <form onSubmit={handleSubmit(submitData)}>

          <input type="text" name="name" placeholder="Nome" 
          {...register("name", { required: "O nome é obrigatório" })}
          onKeyUp={() => {
            trigger("name");
          }}
          />

          {errors.name && (
            <small className={styles.textDanger}>{errors.name.message}</small>
          )}

          <input type="text" name="lastname" placeholder="Sobrenome"
          {...register("lastname", { required: "O sobrenome é obrigatório" })}
          onKeyUp={() => {
            trigger("lastname");
          }}
          />

          {errors.lastname && (
            <small className={styles.textDanger}>{errors.lastname.message}</small>
          )}
          
          <input type="text" name="email" placeholder="E-mail"
          {...register("email", { required: "O email é obrigatório",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido",
          }
          })}
          onKeyUp={() => {
            trigger("email");
          }}
          />

          {errors.email && (
            <small className={styles.textDanger}>{errors.email.message}</small>
          )}

          <InputMask mask="(99) 99999-9999" 
          type="text" name="cellphone" placeholder="Telefone" 
          {...register("cellphone", { required: "O telefone é obrigatório" })}
          onKeyUp={() => {
            trigger("cellphone");
          }}
          />

          {errors.cellphone && (
            <small className={styles.textDanger}>{errors.cellphone.message}</small>
          )}

          <input type="submit" value="Criar contato"/>        
        </form>
      </div>
      
    </>
  )
}