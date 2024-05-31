import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";

import { firestoreDB } from "../firebase";

export default function Transfer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "property/");

    const unsubscribe = onValue(
      starCountRef,
      (snapshot) => {
        Object.entries(snapshot.val()).forEach((entry) => {
          const id = entry[0];
          const value = entry[1];

          console.log(id);

          async function updatePost() {
            await setDoc(doc(firestoreDB, "property", id), {
              ...value,
            });
          }

          updatePost();
        });
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      },
      {
        onlyOnce: true,
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div>Success!</div>;
  }
}
