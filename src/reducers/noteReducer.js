export const noteReducer = (state, action) => {
    switch(action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload }
        case 'SELECT_NOTE':
            return {...state, noteSelected: action.payload}
        case 'GET_LIST':
            return {...state, list: action.payload}
        case 'CREATE_NOTE':
            return {...state, list: [...state.list, action.payload]}
        case 'EDIT_NOTE': 
            return {...state, noteEdit: action.payload, noteSelected: null}
        case 'MODIFY_NOTE':
            const listModified = state.list.filter(note => note.id != action.payload.id)
            const list = [...listModified, action.payload]
            return {...state, list: list}
        case 'DELETE_NOTE':
            const listFiltered = state.list.filter(note => note.id != action.payload.id)
            console.log(listFiltered)
            return {...state, list: listFiltered}
        case 'FILTER_BY_TEXT':
            return { ...state, list: action.payload }
        case 'FILTER_BY_DATE':
            return {...state, list: action.payload}
        default:
            return state
    }
}