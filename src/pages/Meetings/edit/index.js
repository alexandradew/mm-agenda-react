import { useEffect, useContext } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Header from '../../../components/Header'

import styles from './EditMeeting.module.scss'

import api from '../../../services/api'
// import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify'

import { IoChevronBackOutline } from 'react-icons/io5'
import { MeetingContext } from '../../../contexts/MeetingContext'  

export default function EditMeeting() {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    } = useForm();

  const {  getMeetings } = useContext(MeetingContext);

  const history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    api.get('/meetings/show/' + id)
    .then(res => 
      reset({
        name: res.data.name,
        start_time: res.data.start_time,
        finish_time: res.data.finish_time,
        date: res.data.date,
      }))
  }, [reset]) 


  async function submitData(data){
    try{
      let response = await api.patch('/meetings/' + id, {
        name: data.name,
        start_time: data.start_time,
        finish_time: data.finish_time,
        date: data.date,
      })
      if(response.status === 200){
        history.push('/meetings');   
        toast.success('Reunião editada.');
      }
    }catch(err){
      toast.error('Não foi possível completar sua requisição.');
    }
  }

  return (
    <>
      <Header/>
      <div className={styles.editMeetingContainer}>
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

          <input type="time" name="start_time" placeholder="Hora de início"
          {...register("start_time", { required: "A hora de início é obrigatória" })}
          onKeyUp={() => {
            trigger("start_time");
          }}
          />

          {errors.start_time && (
            <small className={styles.textDanger}>{errors.start_time.message}</small>
          )}
          
          <input type="time" name="finish_time" placeholder="Hora de término"
          {...register("finish_time", { required: "A hora de término é obrigatória" })}
          onKeyUp={() => {
            trigger("finish_time");
          }}
          />

          {errors.finish_time && (
            <small className={styles.textDanger}>{errors.finish_time.message}</small>
          )}

        <input type="date" name="date" placeholder="Data"
          {...register("date", { required: "A data é obrigatória" })}
          onKeyUp={() => {
            trigger("date");
          }}
          />

          {errors.date && (
            <small className={styles.textDanger}>{errors.date.message}</small>
          )}


          <input type="submit" value="Editar reunião"/>        
        </form>
      </div>
      
    </>
  )
}
