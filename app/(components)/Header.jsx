import { useState } from "react";
import { LiaEyeSolid } from "react-icons/lia";
import Image from "next/image";

export default function Header() {
  const [downloadURL, setDownloadURL] = useState("");

  return (
    <div className="bg-white w-full h-20 flex justify-between items-center px-4 border-b-2 z-10">
      <div className="flex items-center">
        <p className="text-3xl flex items-center text-sky-400">
          <span className="m-0">Housel</span>
          <span className="flex m-0 self-end ">
            <LiaEyeSolid />
            <LiaEyeSolid />
          </span>
          <span>k</span>
        </p>
      </div>

      <div className="flex items-center rounded-md bg-black text-white px-4 py-2">
        <a href="/app-release.apk" download>
          Get the App
        </a>
      </div>
    </div>
  );
}
