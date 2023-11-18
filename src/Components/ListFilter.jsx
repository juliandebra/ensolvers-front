import React, { useState } from 'react'
import { useNoteContext } from '../Context/NoteContext'
import Card from './Card'
import { filterByDate, filterByText, getNotes } from '../Services/sqlCalls'

const ListFilter = () => {
  const { noteDispatch } = useNoteContext()
  const [filters, setFilters] = useState({
    text: '',
    date: ''
  })

  const handleFilterByText = async () => {
    try {
      noteDispatch({ type: "SET_LOADING", payload: true })
      if(filters.text == ''){
        const results = await getNotes()
        noteDispatch({ type: 'GET_LIST', payload: results.data })
        setTimeout(() => {
          noteDispatch({ type: "SET_LOADING", payload: false })
      }, 1000)
      } else {
        const filteredNotes = await filterByText(filters.text)
        noteDispatch({ type: 'FILTER_BY_TEXT', payload: filteredNotes })
        setTimeout(() => {
          noteDispatch({ type: "SET_LOADING", payload: false })
      }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFilterByDate = async (e) => {
    const searchDate = e.target.value
    try {
      noteDispatch({ type: "SET_LOADING", payload: true })
      const filteredNotes = await filterByDate(searchDate)
      noteDispatch({ type: 'FILTER_BY_DATE', payload: filteredNotes })
      setFilters({ ...filters, date: searchDate })
      setTimeout(() => {
        noteDispatch({ type: "SET_LOADING", payload: false })
    }, 1000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <label>Filter by text:</label>
      <input
        type="text"
        placeholder="Search"
        value={filters.text}
        onChange={(e) => setFilters({...filters, text: e.target.value})}
      />
      <button onClick={handleFilterByText}>Filter by text</button>
      <label>Filter by date:</label>
      <input
        type="date"
        value={filters.date}
        onChange={handleFilterByDate}
      />
    </div>
  )
}

export default ListFilter