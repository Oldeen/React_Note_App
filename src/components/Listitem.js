import React from "react";
import { Link } from "react-router-dom";

let getTitle = (note) => {
  const title = note.body.split("\n")[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

const getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const getcontent = (note) => {
  const title = getTitle(note);
  let content = note.body.replaceAll("\n", "");
  content = content.replaceAll(title, "");

  if (content.length > 45) {
    return content.slice(0, 45) + "....";
  } else {
    return content;
  }
};
const Listitem = ({ note }) => {
  return (
    <Link to={`/NotePage/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getTime(note)}</span>
          {getcontent(note)}
        </p>
      </div>
    </Link>
  );
};

export default Listitem;
