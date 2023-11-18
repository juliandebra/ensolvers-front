import React from 'react'
import Card from '../Components/Card'
import { useNoteContext } from '../Context/NoteContext'
import ListStyles from '../Styles/NoteList.module.css'
import ListFilter from '../Components/ListFilter'
import SkeletonCard from '../Components/SkeletonCard'
const NoteList = () => {
    const {list, loading} = useNoteContext()
  return (
    <>
      <h1>My notes</h1>
      <ListFilter/>
      <div className={ListStyles.list}>
      {loading ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        ) : (
          list.map((note) => <Card key={note.id} note={note} />)
        )}
      </div>
    </>
  )
}

export default NoteList