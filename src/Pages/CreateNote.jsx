import React, { useEffect, useState } from "react";
import { useNoteContext } from "../Context/NoteContext";
import { createNote, editNote, getNote } from "../Services/apiCalls";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles, {
  errorText,
  titleInput,
  textarea,
  input,
  button,
  errButton,
  buttonSection,
  catContainer,
  catBox,
} from "../Styles/Note.module.css";

const CreateNote = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const { noteEdit, noteDispatch } = useNoteContext();
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialNote = {
    title: "",
    description: "",
    date: formattedDate,
    tags: "",
    categories: [],
  };

  const [note, setNote] = useState(initialNote);
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsActive(true);
    if (noteEdit) {
      setNote({
        title: noteEdit.title.trimEnd(),
        description: noteEdit.description.trimEnd(),
        date: formattedDate,
        tags: noteEdit.tags.trimEnd(),
        categories: noteEdit.categories || [],
      });
      setCategories(noteEdit.categories || []);
    } else if (id) {
      const fetchData = async () => {
        try {
          const result = await getNote(id);
          const noteData = result.data;
          setNote({
            ...noteData,
            date: noteData.date || formattedDate,
          });
          setCategories(noteData.categories || []);
          noteDispatch({ type: "EDIT_NOTE", payload: noteData });
        } catch (error) {
          console.error("Error al obtener la nota:", error);
        }
      };
      fetchData();
    }
    if (pathname === "/createnote" || pathname === "/archive/createnote") {
      setNote(initialNote);
      setCategories([]);
    }
  }, [id, noteEdit, pathname]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNote = async () => {
    const newErrors = {
      title: note.title.trim() ? "" : "Please enter a title.",
      description: note.description.trim() ? "" : "Please enter a description.",
      tags: note.tags.trim() ? "" : "Please enter at least one tag.",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      if (noteEdit) {
        await editNote({ ...note, id });
        noteDispatch({ type: "MODIFY_NOTE", payload: { ...note, id } });
      } else {
        const createdNote = await createNote({ ...note, date: formattedDate });
        noteDispatch({ type: "CREATE_NOTE", payload: createdNote });
      }
      navigate(-1);
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    }
  };

  const addCategory = (category) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setNote({ ...note, categories: updatedCategories });
    setNewCategory("");

    const lastCategories =
      JSON.parse(localStorage.getItem("lastCategories")) || [];
    if (!lastCategories.includes(category)) {
      localStorage.setItem(
        "lastCategories",
        JSON.stringify([...lastCategories, category])
      );
    }
  };

  return (
    <div className={`${styles.noteModal} ${isActive ? styles.active : ""}`}>
      <input
        className={titleInput}
        name="title"
        type="text"
        value={note.title}
        placeholder="Note Title"
        onChange={handleChange}
      />
      {errors.title && <div className={errorText}>{errors.title}</div>}
      <textarea
        className={textarea}
        name="description"
        type="text"
        value={note.description}
        placeholder="Description"
        onChange={handleChange}
      />
      {errors.description && (
        <div className={errorText}>{errors.description}</div>
      )}
      <input
        className={input}
        name="tags"
        type="text"
        value={note.tags}
        placeholder="Tags (separated by commas)"
        onChange={handleChange}
      />
      {errors.tags && <div className={errorText}>{errors.tags}</div>}
      <div className={catContainer}>
        <input
          className={input}
          type="text"
          value={newCategory}
          placeholder="Add a category (Press enter to add)"
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newCategory.trim()) {
              addCategory(newCategory.trim());
            }
          }}
        />
        <button
          style={{ backgroundColor: "#330c2f" }}
          onClick={() => newCategory.trim() && addCategory(newCategory.trim())}
        >
          +
        </button>
      </div>
      <div className={catContainer}>
        {categories.map((category, index) => (
          <div key={index} className={catBox}>
            {category}
            <span
              onClick={() =>
                setCategories(categories.filter((cat) => cat !== category))
              }
            >
              x
            </span>
          </div>
        ))}
      </div>
      <div className={buttonSection}>
        <button className={button} onClick={handleNote}>
          {pathname !== "/createnote" ? "Edit" : "Create"} note
        </button>
        {pathname !== "/createnote" && (
          <button onClick={() => navigate(-1)} className={errButton}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
