import { createContext, useContext, useReducer, useEffect } from "react";
import { getNotes } from "../Services/apiCalls";
import { noteReducer } from "../reducers/noteReducer";

const NoteContext = createContext();

const initialState = {
  list: [],
  noteSelected: null,
  noteEdit: null,
  loading: true,
  filterModal: false,
};

const Context = ({ children }) => {
  const [noteState, noteDispatch] = useReducer(noteReducer, initialState);
  const { noteEdit, noteSelected, list, loading, filterModal } = noteState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        noteDispatch({ type: "SET_LOADING", payload: true });
        const results = await getNotes();
        noteDispatch({ type: "GET_LIST", payload: results.data });
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        noteDispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchData();
  }, []);

  return (
    <NoteContext.Provider
      value={{
        noteEdit,
        noteSelected,
        list,
        loading,
        filterModal,
        noteDispatch,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default Context;
export const useNoteContext = () => useContext(NoteContext);
