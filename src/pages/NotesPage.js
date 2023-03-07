import { useLoaderData, Form } from "react-router-dom";
import Listitem from "../components/Listitem";
import AddButton from "../components/AddButton";

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
      <Form action="/NotePage/new">
        <button type="submit" className="floating-button">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <title>add</title>
            <path d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z"></path>
          </svg>
        </button>
      </Form>
    </div>
  );
};

export default NotesPage;
