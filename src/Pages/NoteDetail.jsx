import React, { useEffect, useState } from 'react'
import { useNoteContext } from '../Context/NoteContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteNote, getNote } from '../Services/sqlCalls'
import styles, {noteModal, title, description, bottomSection, buttonSection, date, button, errButton} from '../Styles/Note.module.css' 
import Swal from 'sweetalert2'

const NoteDetail = () => {

    const {noteSelected, noteDispatch} = useNoteContext()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      setIsActive(true)
    }, [])

    const formattedDate = new Date(noteSelected?.date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    })
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
      const fetchData = async () => {
        try{
          const result = await getNote(id)
          noteDispatch({type: 'SELECT_NOTE', payload: result.data})
        } catch (err) {
          console.log(err)
        }
      }
      fetchData()
    }, [id])

    const handleEdit = () => {
      navigate('/editnote/' + noteSelected.id)
      noteDispatch({type: 'EDIT_NOTE', payload: noteSelected})
    }
    const handleDelete = async () => {
      try{
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí, eliminar!',
          cancelButtonText: 'Cancelar'
      }).then( async (res) => {
        if (res.value) {
          const result = await deleteNote(noteSelected.id)
          noteDispatch({type: 'DELETE_NOTE', payload: noteSelected})
          navigate('/')
        }})
      } catch(err){
        console.error('Error al eliminar la nota:', err)
      }
    }
    

  return (
  <>
    {noteSelected && 
    <div className={`${styles.noteModal} ${isActive ? styles.active : ''}`}>
      
        <h4 className={title}>Title: {noteSelected.title}</h4>
        <h4 className={title}>Description: </h4>
        <p className={description}>{noteSelected.description}</p>
        <div className={bottomSection}>
          <h5 className={date}>Last modified: {formattedDate}</h5>
          <h4>Tags: {noteSelected.tags}</h4>
        </div>
        <div className={buttonSection}>
          <button className={button} onClick={handleEdit}>Edit</button>
          <button className={errButton} onClick={handleDelete}>Delete</button>
          <Link to='/'><button className={button}>Close</button></Link>
        </div>
        
    </div>}
  </>
  )
}

export default NoteDetail