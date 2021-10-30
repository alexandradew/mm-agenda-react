import Header from '../../../components/Header'
import styles from './NewMeeting.module.scss'

import api from '../../../services/api'
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import { IoChevronBackOutline } from 'react-icons/io5'
import { AuthContext } from '../../../contexts/AuthContext'

import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

export default function NewMeeting() {
  const {token} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

   
  const history = useHistory()
  async function submitData(data){
    await api.post('/meetings', {
      name: data.name,
      start_time: data.start_time,
      finish_time: data.finish_time,
      date: data.date,
    })
    reset();   
    history.push('/meetings');
  } 

  return (
    <>
     
      <Header/>
      <div className={styles.newMeetingContainer}>
        <button onClick={() => history.goBack()}>
          <IoChevronBackOutline />
        </button>
        <form onSubmit={handleSubmit(submitData)}>

          <input type="text" name="name" placeholder="Nome da reunião"
          {...register("name", { required: "O nome é obrigatório" })}
          onKeyUp={() => {
            trigger("name");
          }}
          />
          

          {errors.name && (
            <small className={styles.textDanger}>{errors.name.message}</small>
          )}

          <input type="text" onFocus={(e) => e.target.type = 'time'}
          name="start_time" placeholder="Hora de início" 
          {...register("start_time", { required: "A hora de início é obrigatória" })}
          onKeyUp={() => {
            trigger("start_time");
          }}
          />

          {errors.start_time && (
            <small className={styles.textDanger}>{errors.start_time.message}</small>
          )}
          
          <input type="text" onFocus={(e) => e.target.type = 'time'}
          name="finish_time" placeholder="Hora de término"
          {...register("finish_time", { required: "A hora de término é obrigatória" })}
          onKeyUp={() => {
            trigger("finish_time");
          }}
          />

          {errors.finish_time && (
            <small className={styles.textDanger}>{errors.finish_time.message}</small>
          )}

        <input type="text" onFocus={(e) => e.target.type = 'date'}
          name="date" placeholder="Data"
          {...register("date", { required: "A data é obrigatória" })}
          onKeyUp={() => {
            trigger("date");
          }}
          />

          {errors.date && (
            <small className={styles.textDanger}>{errors.date.message}</small>
          )}


          <input type="submit" value="Criar reunião"/>        
        </form>
      </div>
      
    </>
  )
}
