import React from 'react'
import { useNoteContext } from '../Context/NoteContext'
import { useNavigate } from 'react-router-dom'
import {card, description, title, button, date} from '../Styles/Card.module.css'
const Card = ({note}) => {
    const {noteDispatch} = useNoteContext()
    const navigate = useNavigate()
    const handleDetail = () => {
        noteDispatch({type: 'SELECT_NOTE', payload: note})
        navigate('/note/'+note.id)
    }
    const formattedDate = new Date(note?.date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    })
  return (
    <div className={card} onClick={handleDetail}>
        <h4 className={title}>{note.title}</h4>
        <p className={description}>{note.description}</p>
        <h5 className={date}>{formattedDate == 'Invalid Date' ? note.date : formattedDate}</h5>
        <button className={button} >View detail</button>
    </div>
  )
}

export default Card