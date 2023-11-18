import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import NoteList from '../Pages/NoteList'

const PublicLayout = () => {

  return (
    <>
        <Navbar/>
        <NoteList/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default PublicLayout