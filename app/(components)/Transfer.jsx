"use client";

import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../firebase";

export default function Transfer() {
  useEffect(() => {
    async function checkAndTransferData() {
      try {
        const lastTransferDoc = await getDoc(
          doc(firestoreDB, "Meta", "LastTransfer")
        );

        if (lastTransferDoc.exists()) {
          const lastTransferData = lastTransferDoc.data();
          const lastTransferDate = lastTransferData.timestamp.toDate();
          const now = new Date();

          const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;

          if (now - lastTransferDate <= threeDaysInMillis) {
            console.log("Data transfer not needed.");
            return;
          }
        }

        const db = getDatabase();
        const starCountRef = ref(db, "property/");

        const unsubscribe = onValue(
          starCountRef,
          async (snapshot) => {
            try {
              const updates = [];
              Object.entries(snapshot.val()).forEach((entry) => {
                const id = entry[0];
                const value = entry[1];

                const updatePost = setDoc(doc(firestoreDB, "Properties", id), {
                  userID: value.UserID,
                  points: value.points,
                  house: value.name,
                  caretaker: value.names,
                  tel: value.phone,
                  images: [
                    value.image1Url,
                    value.image2Url,
                    value.image3Url,
                    value.image4Url,
                  ],
                  deposit: value.deposit,
                  rent: value.rent,
                  bed: value.bedroom,
                  town: value.town,
                  city: value.city,
                });

                updates.push(updatePost);
              });

              await Promise.all(updates);

              // Update the last transfer timestamp
              await setDoc(doc(firestoreDB, "Meta", "LastTransfer"), {
                timestamp: new Date(),
              });

              console.log("Data transfer completed successfully.");
            } catch (error) {
              console.error("Data transfer failed with error:", error);
            }
          },
          (error) => {
            console.error("Data transfer failed with error:", error);
          },
          {
            onlyOnce: true,
          }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
      } catch (error) {
        console.error("Data transfer failed with error:", error);
      }
    }

    checkAndTransferData();
  }, []);

  return null;
}
