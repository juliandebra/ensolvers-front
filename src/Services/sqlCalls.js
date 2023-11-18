import axios from 'axios'
import Swal from 'sweetalert2'
export const getNotes = async () => {
    try {
        const results = await axios('https://server-ensolvers.onrender.com/notes/getnotes')
        return results
    } catch (err){
        Swal.fire({
            icon: 'error',
            title: 'Error al obtener las notas',

        })
    }
}

export const getNote = async (id) => {
    try {
        const result = await axios.get(`https://server-ensolvers.onrender.com/notes/getnote/${id}`)
        return result
    } catch (err){
        Swal.fire({
            icon: 'error',
            title: 'That note does not exist',

          })
        return err
    }
}

export const createNote = async (data) => {
    try {
        const results = await axios.post('https://server-ensolvers.onrender.com/notes/createnote', data)
        Swal.fire({
            icon: 'success',
            title: 'Note created!',
            showConfirmButton: false,
            timer: 1500,
          })
        return results.data
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error creating the note',

          })
        return err
    }
}

export const deleteNote = async (id) => {
    try {
        const results = await axios.delete(`https://server-ensolvers.onrender.com/notes/deletenote/${id}`)
        Swal.fire({
            icon: 'success',
            title: 'Note Deleted!',
            showConfirmButton: false,
            timer: 1500,
          })
        return results
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error deleting the note',

          })
        return err
    }
}

export const editNote = async (data) => {
    try {
        const results = await axios.put(`https://server-ensolvers.onrender.com/notes/editnote/${data.id}`, data)
        Swal.fire({
            icon: 'success',
            title: 'Note edited!',
            showConfirmButton: false,
            timer: 1500,
          })
        return results
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error editing the note',

          })
        return err
    }
}

export const filterByDate = async (date) => {
    try {
        const results = await axios.get('https://server-ensolvers.onrender.com/filters/filterbydate/'+date)
        return results.data
    } catch (err) {
        return err
    }
}

export const filterByText = async (text) => {
    try {
        const results = await axios.get('https://server-ensolvers.onrender.com/filters/filterbytext/'+text)
        return results.data
    } catch (err) {
        return err
    }
}