import React, { useEffect } from "react";
import Card from "../Components/Card";
import { useNoteContext } from "../Context/NoteContext";
import styles from "../Styles/NoteList.module.css";
import Filters from "../Components/Filters";
import SkeletonCard from "../Components/SkeletonCard";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { getNotes } from "../Services/apiCalls";

const NoteList = () => {
  const { list, filterModal, loading, noteDispatch } = useNoteContext();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const date = searchParams.get("date");
  const text = searchParams.get("text");
  const categories = searchParams.get("categories");
  const archivedList = list.filter((note) => note.archived);
  const notArchivedList = list.filter((note) => !note.archived);

  useEffect(() => {
    const fetchData = async () => {
      try {
        noteDispatch({ type: "SET_LOADING", payload: true });
        const results = await getNotes({ date, text, categories });
        noteDispatch({ type: "GET_LIST", payload: results.data });
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        noteDispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchData();
  }, [date, text, categories, noteDispatch]);

  return (
    <div className={styles.grid}>
      <Outlet />
      {filterModal && <Filters />}
      <div className={styles.list}>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : pathname.includes("/archive")
          ? archivedList.map((note) => <Card key={note.id} note={note} />)
          : notArchivedList.map((note) => <Card key={note.id} note={note} />)}
      </div>
    </div>
  );
};

export default NoteList;
