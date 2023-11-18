import React, { useState } from 'react'
import { useNoteContext } from '../Context/NoteContext'
import Card from './Card'
import { filterByDate, filterByText } from '../Services/sqlCalls'

const ListFilter = () => {
  const { noteDispatch } = useNoteContext()
  const [filters, setFilters] = useState({
    text: '',
    date: ''
  })

  const handleFilterByText = async (e) => {
    const searchText = e.target.value
    try {
      if(searchText == ''){
        setFilters({ ...filters, text: searchText })
      } else {
        const filteredNotes = await filterByText(searchText)
        noteDispatch({ type: 'FILTER_BY_TEXT', payload: filteredNotes })
        setFilters({ ...filters, text: searchText })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFilterByDate = async (e) => {
    const searchDate = e.target.value
    try {
      const filteredNotes = await filterByDate(searchDate)
      noteDispatch({ type: 'FILTER_BY_DATE', payload: filteredNotes })
      setFilters({ ...filters, date: searchDate })
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
        onChange={handleFilterByText}
      />
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