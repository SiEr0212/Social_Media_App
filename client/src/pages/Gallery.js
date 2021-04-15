import React, { useContext, useEffect } from "react";
import { app } from "../base";
import { AuthContext } from "../context/auth";

const db = app.firestore();

export default function Gallery() {
  const { user } = useContext(AuthContext);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers] = React.useState([]); // users from firebase

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = (e) => {
    e.preventDefault(); // so when you click submit it doesen't triggger navigation
    const username = e.target.username.value;
    if (!username) {
      return;
    }
    db.collection("users").doc(username).set({
      name: username,
      avatar: fileUrl,
    });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection("users").get();
      setUsers(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchUsers();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <button>Submit</button>
      </form>
      <ul>
        {users.map((useR) => {
          return (
            <li key={useR.name}>
              <img width="100" height="100" src={useR.avatar} alt={useR.name} />
              <p>{useR.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
