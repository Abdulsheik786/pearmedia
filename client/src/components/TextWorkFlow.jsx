import { useState } from "react";
import { enhanceText, generateImage } from "../services/api";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

export default function TextWorkflow() {
  const [prompt, setPrompt] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    try {
      setLoading(true);
      const data = await enhanceText(prompt);
      setEnhanced(data.enhanced);
    } catch (err) {
      alert("Failed to enhance prompt");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const data = await generateImage(enhanced);
      setImage(data.image);
    } catch (err) {
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* Input */}
      <textarea
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none"
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Enhance Button */}
      <button
        onClick={handleEnhance}
        className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        Enhance Prompt ✨
      </button>

      {/* Loader */}
      {loading && <Loader />}

      {/* Enhanced Prompt */}
      {enhanced && !loading && (
        <div className="bg-gray-800 p-3 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Enhanced Prompt:</p>
          <p>{enhanced}</p>

          <button
            onClick={handleGenerate}
            className="mt-3 w-full py-2 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Generate Image 🎨
          </button>
        </div>
      )}

      {/* Image Result */}
      {image && !loading && <ResultCard image={image} />}
    </div>
  );
}