"use client";
import { Suspense } from "react";

import Hero from "./(components)/Hero.jsx";
import Header from "./(components)/Header.jsx";
import Loading from "./(components)/Loading.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
    </>
  );
}
