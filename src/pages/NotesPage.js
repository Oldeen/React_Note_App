import { useLoaderData } from "react-router-dom";
import Listitem from "../components/Listitem";

export async function loader() {
  const notesdata = await fetch("http://localhost:5000/notes");
  const notes = await notesdata.json();
  return { notes };
}

const NotesPage = () => {
  const { notes } = useLoaderData();
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782;Note</h2>
        {<p className="notes-count">{notes.length}</p>}
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <Listitem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
