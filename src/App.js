import Header from "./components/Header";
import NotesPage, { loader as notesPageLoader } from "./pages/NotesPage";
import NotePage, { loader as noteLoader } from "./pages/NotePage";

import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error-page";
import "./App.css";

const Root = () => {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <NotesPage />,
        loader: notesPageLoader,
      },
      {
        path: "NotePage/:id",
        element: <NotePage />,
        loader: noteLoader,
      },
    ],
  },
]);

export default router;
