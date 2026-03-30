import { useState } from "react";
import { analyzeImage, generateImage } from "../services/api";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

export default function ImageWorkflow() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const data = await analyzeImage(url);
      setAnalysis(data[0]?.generated_text || "No analysis found");
    } catch (err) {
      alert("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const data = await generateImage(analysis);
      setImage(data.image);
    } catch (err) {
      alert("Failed to generate variation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* Input */}
      <input
        type="text"
        placeholder="Paste image URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600"
      />

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Analyze Image 🔍
      </button>

      {/* Loader */}
      {loading && <Loader />}

      {/* Analysis */}
      {analysis && !loading && (
        <div className="bg-gray-800 p-3 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Analysis:</p>
          <p>{analysis}</p>

          <button
            onClick={handleGenerate}
            className="mt-3 w-full py-2 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Generate Variation 🎨
          </button>
        </div>
      )}

      {/* Result Image */}
      {image && !loading && <ResultCard image={image} />}
    </div>
  );
}