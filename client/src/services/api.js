const BASE_URL = "https://pearmedia-backend.onrender.com/api";

export const enhanceText = async (prompt) => {
  const res = await fetch(`${BASE_URL}/text/enhance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  return res.json();
};

export const generateImage = async (prompt) => {
  const res = await fetch(`${BASE_URL}/image/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  return res.json();
};

export const analyzeImage = async (imageUrl) => {
  const res = await fetch(`${BASE_URL}/image/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrl }),
  });

  return res.json();
};