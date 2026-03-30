import { useState } from "react";
import TextWorkflow from "../components/TextWorkFlow.jsx";
import ImageWorkflow from "../components/ImageWorkFlow.jsx";
import Navbar from "../components/Navbar";

export default function Home() {
  const [tab, setTab] = useState("text");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-6">

      <Navbar />

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setTab("text")}
          className={`px-4 py-2 rounded ${
            tab === "text" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Text → Image
        </button>

        <button
          onClick={() => setTab("image")}
          className={`px-4 py-2 rounded ${
            tab === "image" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Image → Variation
        </button>
      </div>

      {tab === "text" ? <TextWorkflow /> : <ImageWorkflow />}
    </div>
  );
}