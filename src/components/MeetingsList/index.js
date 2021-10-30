import React, { useContext, useEffect, useState } from 'react'
import styles from './MeetingsList.module.scss'
import api from '../../services/api'

import { useHistory } from 'react-router-dom'

import { FiEdit } from 'react-icons/fi'
import { AiTwotoneDelete } from 'react-icons/ai'

import { MeetingContext } from '../../contexts/MeetingContext';

function MeetingsList() {
  const { meetings, getMeetings } = useContext(MeetingContext);

  useEffect(() => {
    getMeetings();
  }, [])

  const history = useHistory();

  function handleEdit(meetingId){
    history.push('/meetings/edit/' + meetingId)
  }

  async function handleDelete(id){
    let response = await api.delete('/meetings/' + id)
    if(response.status === 200){
      getMeetings();
    }
  }
  
  return (
    
    <div className={styles.MeetingsContainer}>
    {meetings?.length > 0 ? 
      <>
      {meetings.map((meeting, idx) => {
      return (      
        <div key={meeting.id}>
          <section>
            <h1>{meeting.name}</h1>
            <p>Hora início: { meeting.start_time }</p>
            <p>Hora término: { meeting.finish_time }</p>
          </section>
          <section className={styles.actions}>
            <span>
              Data: {meeting.date.split('-').reverse().join('/')}
            </span>
            <span>
              <FiEdit size={20} onClick={() => handleEdit(meeting.id)}/> 
              <AiTwotoneDelete size={20} onClick={() => handleDelete(meeting.id)}/> 
            </span>
          </section>
        </div>
      )})}
      </>
      : 'Nenhuma reunião marcada.' }
      </div>
  )
}

export default MeetingsList
