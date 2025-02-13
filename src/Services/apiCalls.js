import axios from "axios";
import Swal from "sweetalert2";

const handleError = (error, message) => {
  Swal.fire({
    icon: "error",
    title: message,
  });
  console.error(error);
  return error;
};

const showSuccess = (title) => {
  Swal.fire({
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const getNotes = async (filters = {}) => {
  try {
    const results = await axios("https://nest-ensolvers.onrender.com/notes", {
      params: filters,
    });
    return results;
  } catch (err) {
    return handleError(err, "Error getting the notes!");
  }
};

export const getNote = async (id) => {
  try {
    const result = await axios.get(
      `https://nest-ensolvers.onrender.com/notes/${id}`
    );
    return result;
  } catch (err) {
    return handleError(err, "That note does not exist");
  }
};

export const createNote = async (data) => {
  try {
    const results = await axios.post(
      "https://nest-ensolvers.onrender.com/notes/",
      data
    );
    showSuccess("Note created!");
    return results.data;
  } catch (err) {
    return handleError(err, "Error creating the note");
  }
};

export const deleteNote = async (id) => {
  try {
    const results = await axios.delete(
      `https://nest-ensolvers.onrender.com/notes/${id}`
    );
    showSuccess("Note Deleted!");
    return results;
  } catch (err) {
    return handleError(err, "Error deleting the note");
  }
};

export const editNote = async (data) => {
  try {
    const results = await axios.put(
      `https://nest-ensolvers.onrender.com/notes/${data.id}`,
      data
    );
    showSuccess("Note edited!");
    return results;
  } catch (err) {
    return handleError(err, "Error editing the note");
  }
};

export const setArchiveStatus = async (id, archived) => {
  try {
    const results = await axios.patch(
      `https://nest-ensolvers.onrender.com/notes/${id}/archive`,
      { archived }
    );
    showSuccess(archived ? "Note archived!" : "Note unarchived!");
    return results.data;
  } catch (err) {
    return handleError(
      err,
      archived ? "Error archiving the note" : "Error unarchiving the note"
    );
  }
};

export const addCategory = async (id, category) => {
  try {
    const results = await axios.patch(
      `https://nest-ensolvers.onrender.com/notes/${id}/add-category`,
      { category }
    );
    showSuccess("Category added!");
    return results.data;
  } catch (err) {
    return handleError(err, "Error adding the category");
  }
};

export const removeCategory = async (id, category) => {
  try {
    const results = await axios.patch(
      `https://nest-ensolvers.onrender.com/notes/${id}/remove-category`,
      { category }
    );
    showSuccess("Category removed!");
    return results.data;
  } catch (err) {
    return handleError(err, "Error removing the category");
  }
};
