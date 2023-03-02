import React from "react";
import { Link } from "react-router-dom";

const LInksPage = () => {
  return (
    <>
      <p>
        <Link to={"/NotesPage"}> NotesPage</Link>
      </p>
    </>
  );
};

export default LInksPage;
