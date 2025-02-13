import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import NoteList from "../Pages/NoteList";

const PublicLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      {pathname == "/" && <NoteList />}
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
