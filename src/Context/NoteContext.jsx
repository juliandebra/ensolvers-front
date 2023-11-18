import { createContext, useContext, useReducer, useEffect } from "react"
import { getNotes } from "../Services/sqlCalls"
import { noteReducer } from "../reducers/noteReducer"
import { useNavigate } from "react-router-dom"

const NoteContext = createContext()

const initialState = {
    list: [],
    noteSelected: null,
    noteEdit: null,
    loading: true,
}

const Context = ({children}) => {
    const [noteState, noteDispatch] = useReducer(noteReducer, initialState)
    const {noteEdit, noteSelected, list, loading} = noteState
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                noteDispatch({ type: "SET_LOADING", payload: true })
                const results = await getNotes()
                noteDispatch({type: 'GET_LIST', payload: results.data})
                setTimeout(() => {
                    noteDispatch({ type: "SET_LOADING", payload: false })
                }, 2000)
                
            } catch (err) {
                console.log(err)
                noteDispatch({ type: "SET_LOADING", payload: false })
            }
        } 
        fetchData()
    }, [])

    return (
        <NoteContext.Provider value={{noteEdit, noteSelected, list, loading, noteDispatch}}>
            {children}
        </NoteContext.Provider>
    )
}
export default Context
export const useNoteContext = () => useContext(NoteContext)