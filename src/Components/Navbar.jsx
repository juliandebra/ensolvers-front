import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navbar, icon } from "../Styles/Navbar.module.css";
import noteLogo from "../assets/note-logo.png";
import { BiArchiveIn, BiSliderAlt, BiSolidHome } from "react-icons/bi";
import { useNoteContext } from "../Context/NoteContext";
import { RiStickyNoteAddFill, RiStickyNoteAddLine } from "react-icons/ri";

const Navbar = () => {
  const { noteDispatch } = useNoteContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className={navbar}>
      <Link to="/">
        <h3 style={{ color: "white" }}>
          Welcome to Notes! <img src={noteLogo} width={30} />
        </h3>
      </Link>
      <div>
        {pathname.includes("/archive") ? (
          <Link to="/">
            <BiSolidHome size={30} title="Active notes" className={icon} />
          </Link>
        ) : (
          <Link to="/archive">
            <BiArchiveIn size={30} title="Archived notes" className={icon} />
          </Link>
        )}
        <BiSliderAlt
          className={icon}
          size={30}
          title="Filters"
          onClick={() => noteDispatch({ type: "FILTER_MODAL" })}
        />
        {pathname == "/createnote" ? (
          <RiStickyNoteAddFill
            className={icon}
            onClick={() => navigate(-1)}
            size={30}
            title="Close note modal"
          />
        ) : (
          <Link
            to={
              pathname.includes("archive") ? "archive/createnote" : "createnote"
            }
          >
            <RiStickyNoteAddLine
              size={30}
              title="Create new note"
              className={icon}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
