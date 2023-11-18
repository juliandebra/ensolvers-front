import React, { useEffect, useState } from 'react'
import { useNoteContext } from '../Context/NoteContext'
import { createNote, editNote, getNote } from '../Services/sqlCalls'
import { Link, useLocation, useParams } from 'react-router-dom'
import styles, {errorText, title, textarea, tags, button, errButton} from '../Styles/Note.module.css' 

const CreateNote = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const formattedDate = `${year}-${month}-${day}`

    const {noteEdit, noteDispatch} = useNoteContext()
    const {pathname} = useLocation()
    const initialNote = {
      title:  '',
      description:  '',
      date: formattedDate,
      tags:  ''
    }
    const [note, setNote] = useState(initialNote)
    const [isActive, setIsActive] = useState(false)
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [tagsError, setTagsError] = useState('')

    useEffect(() => {
      setIsActive(true)
    }, [])

    const {id} = useParams()

    const handleChange = (e) => setNote({...note, [e.target.name]: e.target.value})

    useEffect(() => {
        if (noteEdit) {
          setNote({
            title: noteEdit.title.trimEnd(),
            description: noteEdit.description.trimEnd(), 
            date: formattedDate,
            tags: noteEdit.tags.trimEnd()
        })
        } else if (id) {
          const fetchData = async () => {
            try {
              const result = await getNote(id)
              const noteData = result.data
              setNote({
                ...noteData,
                date: noteData.date ? noteData.date : formattedDate,
              })
            } catch (error) {
              console.error('Error al obtener la nota:', error)
            }
          }
          fetchData()
        }
        if(pathname == '/createnote'){
          setNote(initialNote)
        } 
      }, [id, noteEdit, pathname])

    const handleNote = async () => {
      setTitleError('')
      setDescriptionError('')
      setTagsError('')

      
      if (note.title.trim().length === 0) {
        setTitleError('Please enter a title.')
      }

      if (note.description.trim().length === 0) {
        setDescriptionError('Please enter a description.')
      }

      if (note.tags.trim().length === 0) {
        setTagsError('Please enter at least one tag.')
      }

      if (titleError || descriptionError || tagsError) {
        return;
        
      } else {

        if(noteEdit) {
            try {
                const editedNote = await editNote(note)
                noteDispatch({type: 'MODIFY_NOTE', payload: note})
            } catch (error) {
                console.error('Error al crear la nota:', error)
            }
        } else {
            try {
                const createdNote = await createNote({...note, date: formattedDate})
                noteDispatch({type: 'CREATE_NOTE', payload: createdNote})
            } catch (error) {
                console.error('Error al crear la nota:', error)
            }
        }
      }
    }
  return (
    <div className={`${styles.noteModal} ${isActive ? styles.active : ''}`}>
        <input className={title} name='title' type="text" value={note.title} placeholder='Note Title' onChange={handleChange}/>
        {titleError && <div className={errorText}>{titleError}</div>}
        <textarea className={textarea} name='description' type="text" value={note.description} placeholder='Description' onChange={handleChange}/>
        {descriptionError && <div className={errorText}>{descriptionError}</div>}
        <input className={tags} name='tags' type="text" value={note.tags} placeholder='Tags (separated by commas)' onChange={handleChange}/>
        {tagsError && <div className={errorText}>{tagsError}</div>}
        <button className={button} onClick={handleNote}>{pathname != '/createnote' ? 'Edit' : 'Create'} note</button>
        {pathname  != '/createnote' && <Link to='/'><button className={errButton}>cancel</button></Link>}
    </div>
  )
}

export default CreateNote