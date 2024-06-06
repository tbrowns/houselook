"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward, IoMdBed } from "react-icons/io";
import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { firestoreDB } from "../firebase";
import Loading from "./Loading";

export default function Hero() {
  const [lastVisible, setLastVisible] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const observer = useRef();

  const getProperty = useCallback(async () => {
    setLoading(true);
    const first = query(collection(firestoreDB, "Properties"), limit(12));

    const documentSnapshots = await getDocs(first);
    const properties = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      images: [
        doc.data().images[1],
        doc.data().images[2],
        doc.data().images[3],
      ],
    }));

    setAllProperties(properties);

    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastVisible(last);
    setLoading(false);
  }, []);

  const getMoreProperties = useCallback(async () => {
    if (!lastVisible) return;
    setLoading(true);

    const next = query(
      collection(firestoreDB, "Properties"),
      startAfter(lastVisible),
      limit(8)
    );

    const documentSnapshots = await getDocs(next);
    const properties = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      images: [
        doc.data().images[1],
        doc.data().images[2],
        doc.data().images[3],
      ],
    }));

    setAllProperties((prev) => [...prev, ...properties]);

    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastVisible(last);
    setLoading(false);
  }, [lastVisible]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const lastPropertyElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getMoreProperties();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, getMoreProperties]
  );

  const scrollContainerRefs = useRef([]);

  const scrollLeft = (index) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index].scrollBy({
        left: -scrollContainerRefs.current[index].clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (index) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index].scrollBy({
        left: scrollContainerRefs.current[index].clientWidth,
        behavior: "smooth",
      });
    }
  };

  const downloadAppPrompt = () => {
    return (
      <div className="fixed flex flex-col items-center justify-center w-auto h-auto z-20 bg-white border border-gray-300 rounded mx-4 p-4 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Download the app</h1>
          <p className="text-lg">
            to browse and save your favourite properties
          </p>
          <div className="w-full flex justify-around">
            <button
              type="button"
              className="text-black bg-white rounded px-4 py-2 border-2 border-black"
              onClick={() => setShowDownloadPrompt(false)}
            >
              Continue with Chrome
            </button>
            <button
              type="button"
              className="bg-black text-white rounded px-4 py-2"
              onClick={() => setShowDownloadPrompt(false)}
            >
              <a href="/houselook-app.apk" download>
                Download
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-fit gap-10 flex flex-wrap justify-center my-4 mx-4">
        {showDownloadPrompt && downloadAppPrompt()}
        {allProperties.map((property, index) => {
          const isLastProperty = allProperties.length === index + 1;
          return (
            <div
              key={property.id}
              ref={isLastProperty ? lastPropertyElementRef : null}
              className="flex flex-grow flex-col w-60 max-w-80 h-auto bg-white rounded-md shadow-md overflow-hidden my-4 relative"
            >
              <div
                className="relative w-full h-auto flex overflow-x-scroll scrollbar-hide scroll-snap-x mandatory group"
                ref={(el) => (scrollContainerRefs.current[index] = el)}
              >
                {property.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative flex-shrink-0 w-full h-full aspect-square scroll-snap-align-center"
                  >
                    <img
                      className="w-full aspect-square object-cover"
                      src={image}
                      alt={`property-${imgIndex}`}
                    />

                    <button
                      type="button"
                      className={`absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-75 hover:opacity-100 ${
                        imgIndex === 0 ? "hidden" : ""
                      }`}
                      onClick={() => scrollLeft(index)}
                    >
                      <IoIosArrowBack size={20} />
                    </button>
                    <button
                      type="button"
                      className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-75 hover:opacity-100 ${
                        imgIndex === 2 ? "hidden" : ""
                      }`}
                      onClick={() => scrollRight(index)}
                    >
                      <IoIosArrowForward size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="my-4">
                <div className="flex items-center gap-2 h-6 p-2">
                  <p>
                    <IoLocationSharp />
                  </p>
                  <p className="font-bold">{`${property.town}, ${property.city}`}</p>
                </div>

                <div className="flex items-center gap-2 p-2 text-slate-500">
                  <p>
                    <IoMdBed />
                  </p>
                  <p>{property.bed}</p>
                </div>

                <div className="flex items-center justify-between gap-2 p-2">
                  <button
                    type="button"
                    className="bg-black text-white rounded px-4 py-2"
                    onClick={() => setShowDownloadPrompt(true)}
                  >
                    See Details
                  </button>
                  <p className="font-bold text-xl">{`Ksh.${property.rent}`}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}
    </>
  );
}
