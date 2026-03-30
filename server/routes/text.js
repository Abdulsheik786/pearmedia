import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/enhance", async (req, res) => {
  try {
    const { prompt } = req.body;

    const callHF = async () => {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `Enhance this prompt with cinematic detail: ${prompt}`,
          }),
        }
      );

      return response.json();
    };

    let data = await callHF();

    // 🔥 If model loading → retry after delay
    if (data.error && data.error.includes("loading")) {
      console.log("Model loading... retrying");
      await new Promise((r) => setTimeout(r, 15000)); // wait 15 sec
      data = await callHF();
    }

    const result =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : `High-quality cinematic image of ${prompt}`;

    res.json({ enhanced: result });

  } catch (err) {
    res.status(500).json({ error: "Enhancement failed" });
  }
});

export default router;