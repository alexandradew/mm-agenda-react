import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'

import styles from './BoxesMenu.module.scss'

import {TiContacts} from 'react-icons/ti'
import {MdGroups} from 'react-icons/md'

import { ContactContext } from '../../contexts/ContactContext';
import { MeetingContext } from '../../contexts/MeetingContext';

function BoxesMenu() {
  const { contacts, getContacts } = useContext(ContactContext);
  const { meetings, getMeetings } = useContext(MeetingContext);

  useEffect(() => {
    getContacts();
    getMeetings();
  }, [])

  return (
    <section className={styles.boxes}>
      <Link to="/contacts">
        <div className={styles.link}>
            <section>
              <h2>Contatos</h2>
              <TiContacts size={25}/>
            </section>
            <span>{contacts?.length}</span>
        </div>
      </Link>
      <div className={styles.linkNew}>
        <Link to="/contacts/new">
          <section>
            <h2>Novo contato</h2>
            <TiContacts size={20}/>
          </section>
        </Link>
        <Link to="/meetings/new">
          <section>
            <h2>Nova reunião</h2>
            <MdGroups size={20}/>
          </section>
        </Link>
      </div>
      <Link to="/meetings">
        <div className={styles.link}>
          <section>
            <h2>Reuniões</h2>
            <MdGroups size={25}/>
          </section>
          <span>{meetings?.length}</span>
        </div>
      </Link>
    </section>
  )
}

export default BoxesMenu
