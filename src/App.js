import Header from "./components/Header";
import NotesPage, { loader as notesPageLoader } from "./pages/NotesPage";
import NotePage, {
  loader as noteLoader,
  updatenoteaction,
  deletenoteaction,
  createAction,
  createloader,
} from "./pages/NotePage";

import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "./pages/Error-page";
import "./App.css";

const Root = () => {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Outlet />
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
        path: "/NotePage/:id",
        element: <NotePage />,
        loader: noteLoader,
      },
      {
        path: "/NotePage/:id/update",
        action: updatenoteaction,
        element: <NotesPage />,
      },
      {
        path: "/NotePage/:id/delete",
        action: deletenoteaction,
        element: <NotesPage />,
        loader: notesPageLoader,
      },

      {
        path: "/Create",
        action: createAction,
        loader: createloader,
      },
      {
        path: "/NotePage/new",
        element: <NotePage />,
      },
    ],
  },
]);

export default router;
