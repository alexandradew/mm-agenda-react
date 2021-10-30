import {createContext, useState, useEffect } from 'react';

import api from '../services/api'

export const MeetingContext = createContext([]);

export function MeetingContextProvider({ children }){
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
      getMeetings();    
  }, [])

  async function getMeetings(){
    api.get('/meetings')
    .then(res => setMeetings(res.data))
  }

	function handleMeetings(data){
    setMeetings(data);
	}

  return(
    <MeetingContext.Provider value={{ meetings: meetings, handleMeetings: handleMeetings, getMeetings: getMeetings }}>
		 {children}
    </MeetingContext.Provider>
  )
}