import React, { useEffect, useState } from "react";
import { useNoteContext } from "../Context/NoteContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteNote, getNote } from "../Services/apiCalls";
import styles, {
  title,
  description,
  bottomSection,
  buttonSection,
  button,
  errButton,
} from "../Styles/Note.module.css";
import Swal from "sweetalert2";

const NoteDetail = () => {
  const { noteSelected, noteDispatch } = useNoteContext();
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const formattedDate = new Date(noteSelected?.date).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNote(id);
        noteDispatch({ type: "SELECT_NOTE", payload: result.data });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleEdit = () => {
    navigate("/editnote/" + noteSelected.id);
    noteDispatch({ type: "EDIT_NOTE", payload: noteSelected });
  };
  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete?",
        text: "¡You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Yes, delete!",
        cancelButtonText: "Cancel",
      }).then(async (res) => {
        if (res.value) {
          const result = await deleteNote(noteSelected.id);
          noteDispatch({ type: "DELETE_NOTE", payload: noteSelected });
          navigate(-1);
        }
      });
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };
  return (
    <>
      {noteSelected && (
        <div className={`${styles.noteModal} ${isActive ? styles.active : ""}`}>
          <h4 className={title}>{noteSelected.title}</h4>
          <p className={description}>{noteSelected.description}</p>
          <div className={bottomSection}>
            <h4>Tags: {noteSelected.tags}</h4>
            <h4>
              Categories:{" "}
              {noteSelected.categories.map((cat, index) => (
                <span key={index}>
                  {cat}
                  {index !== noteSelected.categories.length - 1 && ", "}
                </span>
              ))}
            </h4>
            <h4>Last modified: {formattedDate}</h4>
          </div>

          <div className={buttonSection}>
            <button className={button} onClick={handleEdit}>
              Edit
            </button>
            <button className={errButton} onClick={handleDelete}>
              Delete
            </button>

            <button
              onClick={() =>
                navigate(pathname.includes("/archive") ? "/archive" : "/")
              }
              className={button}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDetail;
