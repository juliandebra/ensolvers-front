const updateNoteInList = (list, id, updates) => {
  return list.map((note) => (note.id === id ? { ...note, ...updates } : note));
};

export const noteReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SELECT_NOTE":
      return { ...state, noteSelected: action.payload };

    case "GET_LIST":
      return { ...state, list: action.payload };

    case "CREATE_NOTE":
      return { ...state, list: [...state.list, action.payload] };

    case "EDIT_NOTE":
      return { ...state, noteEdit: action.payload, noteSelected: null };

    case "MODIFY_NOTE":
      return {
        ...state,
        list: updateNoteInList(state.list, action.payload.id, action.payload),
      };

    case "DELETE_NOTE":
      return {
        ...state,
        list: state.list.filter((note) => note.id !== action.payload.id),
      };
    case "FILTER_MODAL":
      return { ...state, filterModal: !state.filterModal };

    case "ARCHIVE_NOTE":
    case "UNARCHIVE_NOTE":
      return {
        ...state,
        list: updateNoteInList(state.list, action.payload.id, {
          archived: action.type === "ARCHIVE_NOTE",
        }),
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        list: updateNoteInList(state.list, action.payload.id, {
          categories: [
            ...action.payload.note.categories,
            action.payload.category,
          ],
        }),
      };

    case "REMOVE_CATEGORY":
      return {
        ...state,
        list: updateNoteInList(state.list, action.payload.id, {
          categories: action.payload.note.categories.filter(
            (cat) => cat !== action.payload.category
          ),
        }),
      };

    default:
      return state;
  }
};
