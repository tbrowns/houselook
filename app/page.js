import { Suspense } from "react";

import Transfer from "./(components)/Transfer.jsx";
import Hero from "./(components)/Hero.jsx";
import Header from "./(components)/Header.jsx";
import Loading from "./(components)/Loading.jsx";

export default function Home() {
  return (
    <>
      <Transfer />
      <Header />
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
    </>
  );
}
