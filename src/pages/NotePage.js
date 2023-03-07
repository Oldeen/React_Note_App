import React, { useState, useEffect } from "react";
import { redirect, useLoaderData, Form, useLocation } from "react-router-dom";

import ArrowLeft from "../components/ArrowLeft";

export async function loader({ params }) {
  const notedata = await fetch("http://localhost:5000/notes/" + params.id);
  const note = await notedata.json();
  return note;
}

export async function deletenoteaction({ params }) {
  await fetch(`http://localhost:5000/notes/${params.id}`, {
    method: "DELETE",
  });
  return redirect("/");
}

export async function createAction({ request, params }) {
  const formData = await request.formData();
  const { newnote: body } = Object.fromEntries(formData);
  console.log(body);
  await fetch(`http://localhost:5000/notes/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ body, updated: new Date() }),
  });

  return redirect("/");
}

export async function createloader({ request, params }) {
  console.log("loadercreate");
  return null;
}
const load = async () => {
  const notesdata = await fetch("http://localhost:5000/notes");
  const notes = await notesdata.json();
  return { notes };
};

export async function updatenoteaction({ request, params }) {
  const formData = await request.formData();
  const { updatednote: body } = Object.fromEntries(formData);
  if (!body || body === "\n") {
    deletenoteaction({ params });
    load();
    return redirect("/");
  } else {
    console.log("xxx");
    await fetch(`http://localhost:5000/notes/${params.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ body, updated: new Date() }),
    });
  }
  return redirect("/");
}

const NotePage = () => {
  const { pathname: currentPath } = useLocation();
  const data = useLoaderData();

  {
    if (currentPath !== "/NotePage/new") {
      return (
        <div className="note">
          {console.log("noew", data)}
          <div className="note-header">
            <h3>
              <button type="submit" form="noteUpdateForm">
                <ArrowLeft />
              </button>
            </h3>

            <Form action="delete" method="post">
              <button type="submit">Delete</button>
            </Form>
          </div>

          <Form id="noteUpdateForm" action="update" method="post">
            <textarea name="updatednote" defaultValue={data.body} />
          </Form>
        </div>
      );
    } else {
      return (
        <div className="note">
          <div className="note-header">
            <h3>
              <button type="submit" form="noteUpdateForm">
                <ArrowLeft />
              </button>
            </h3>

            {/* <Form action="/create" method="post"> */}
            <button type="submit" form="noteUpdateForm">
              Done
            </button>
            {/* </Form> */}
          </div>

          <Form id="noteUpdateForm" action="/create" method="post">
            <textarea name="newnote" defaultValue="" />
          </Form>
        </div>
      );
    }
  }
};

export default NotePage;
