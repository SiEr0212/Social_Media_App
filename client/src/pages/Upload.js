import React from "react";
import { app } from "../base";

export default function Upload() {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("Uploaded file", file.name);
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); // so when you click submit it doesen't triggger navigation
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="user" placeholder="NAME" />
        <button>Submit</button>
      </form>
      <ul>
        <li>---</li>
      </ul>
    </>
  );
}
