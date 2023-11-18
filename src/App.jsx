import { Route, Routes } from 'react-router-dom'
import './Styles/App.css'
import PublicLayout from './Layout/PublicLayout'
import CreateNote from './Pages/CreateNote'
import NoteDetail from './Pages/NoteDetail'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path='/' element={<PublicLayout/>}>
            <Route path='/createnote' element={<CreateNote/>}/>
            <Route path='/editnote/:id' element={<CreateNote/>}/>
            <Route path='/note/:id' element={<NoteDetail/>}/>
        </Route>
      </Routes> 
    </div>
  )
}

export default App


 {/* */}
