import { useNoteContext } from "../Context/NoteContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  card,
  description,
  title,
  date,
  iconGrp,
  icon,
} from "../Styles/Card.module.css";
import { BiArchiveIn, BiArchiveOut, BiDetail } from "react-icons/bi";
import { setArchiveStatus } from "../Services/apiCalls";

const Card = ({ note }) => {
  const { noteDispatch } = useNoteContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDetail = () => {
    noteDispatch({ type: "SELECT_NOTE", payload: note });
    navigate(
      `${pathname.includes("/archive") ? "/archive/" : "/note/"}${note.id}`,
      {
        state: { fromArchive: pathname.includes("archive") },
      }
    );
  };

  const handleArchive = async () => {
    const updatedNote = await setArchiveStatus(note.id, !note.archived);
    noteDispatch({
      type: note.archived ? "UNARCHIVE_NOTE" : "ARCHIVE_NOTE",
      payload: updatedNote,
    });
  };

  const formattedDate = new Date(note?.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className={card}>
      <h4 className={title}>{note.title}</h4>
      <p className={description}>{note.description}</p>
      <h5 className={date}>
        {formattedDate === "Invalid Date" ? note.date : formattedDate}
      </h5>
      <div className={iconGrp}>
        <BiDetail
          size={50}
          onClick={handleDetail}
          className={icon}
          title="View note detail"
        />
        {note.archived ? (
          <BiArchiveOut
            size={50}
            onClick={handleArchive}
            className={icon}
            title="Unarchive note"
          />
        ) : (
          <BiArchiveIn
            size={50}
            onClick={handleArchive}
            className={icon}
            title="Archive note"
          />
        )}
      </div>
    </div>
  );
};

export default Card;
