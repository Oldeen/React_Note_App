import React, { useState, useEffect } from "react";
import { Link, useParams, useLoaderData } from "react-router-dom";
import notes from "../assets/data";

import ArrowLeft from "../components/ArrowLeft";

export async function loader({ params }) {
  const notedata = await fetch("http://localhost:5000/notes/" + params.id);
  const note = await notedata.json();

  return note;
}

const NotePage = () => {
  const { body } = useLoaderData();
  console.log(body);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea value={body}>Todays Agenda </textarea>
    </div>
  );
};

export default NotePage;
