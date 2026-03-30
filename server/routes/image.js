import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 🔥 improve prompt automatically
    const finalPrompt = `${prompt}, ultra realistic, cinematic lighting, 4k, high detail`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: finalPrompt
        }),
      }
    );

    // 🔍 check if error response
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      console.log("HF ERROR:", errorData);

      return res.json({
        error: "Model loading... retry in few seconds",
        image: "https://picsum.photos/400"
      });
    }

    const buffer = await response.arrayBuffer();

    console.log("BUFFER SIZE:", buffer.byteLength);

    // ⚠️ allow even small images (less strict)
    if (buffer.byteLength < 3000) {
      return res.json({
        error: "Weak response, retry",
        image: "https://picsum.photos/400"
      });
    }

    const base64 = Buffer.from(buffer).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`,
    });

  } catch (err) {
    console.error(err);
    res.json({
      image: "https://picsum.photos/400"
    });
  }
});

export default router;