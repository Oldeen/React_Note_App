import React, { useState, useEffect } from "react";
import { redirect, useLoaderData, Form } from "react-router-dom";

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
  const { body } = useLoaderData();
  return (
    <div className="note">
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
        <textarea name="updatednote" defaultValue={body} />
      </Form>
    </div>
  );
};

export default NotePage;
