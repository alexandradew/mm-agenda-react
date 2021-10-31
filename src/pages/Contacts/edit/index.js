import { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom'


import Header from '../../../components/Header'
import styles from './EditContact.module.scss'

import api from '../../../services/api'
// import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import { IoChevronBackOutline } from 'react-icons/io5'

import { ContactContext } from '../../../contexts/ContactContext'

import { toast } from 'react-toastify'



export default function EditContact() {
  const { getContacts } = useContext(ContactContext);
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    } = useForm();

  const history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    api.get('/contacts/show/' + id)
    .then(res => 
      reset({
        name: res.data.name,
        lastname: res.data.lastname,
        email: res.data.email,
        cellphone: res.data.cellphone,
      }))
  }, [id, reset]) 


  async function sendData(data){
    try{
      let response = await api.patch('/contacts/' + id, {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        cellphone: data.cellphone,
      })
      if(response.status === 200){
        getContacts();
        history.push('/contacts');   
        toast.success("Contato editado.");
      }
    }catch(err){
      if(err.response !== undefined){
        if(err.response.data.error.e.includes('contacts.email')){
          toast.error('Email já registrado em outro contato');
        }else if(err.response.data.error.e.includes('contacts.cellphone')){
          toast.error('Telefone já registrado em outro contato');
        }else{
          toast.error('Não foi possível completar sua requisição');
        } 
      }else{
        toast.error('Não foi possível completar sua requisição');
      }
    }
  }

  return (
      <>
      <Header/>
      <div className={styles.editContactContainer}>
        <button onClick={() => history.goBack()}>
            <IoChevronBackOutline />
        </button>
        <form onSubmit={handleSubmit(sendData)}>
              
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

          <input mask="(99) 99999-9999" 
          type="text" name="cellphone" placeholder="Telefone" 
          {...register("cellphone", { required: "O telefone é obrigatório" })}
          onKeyUp={() => {
            trigger("cellphone");
          }}          
          defaultValue={'41 995253547'}
          />

          {errors.cellphone && (
            <small className={styles.textDanger}>{errors.cellphone.message}</small>
          )}

          <input type="submit" value="Editar" onClick={handleSubmit}/>        
        </form>
      </div>
      
    </>
  )
}
