export async function scanWithVision(base64: string) {
  const res = await fetch(
    (process.env.GOOGLE_CLOUD_VISION_URL as string) +
      "?key=" +
      process.env.GOOGLE_CLOUD_VISION_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64 },
            features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
          },
        ],
      }),
    }
  );

  const json = await res.json();

  for (const annotation of json.responses?.[0]?.textAnnotations) {
    const match = annotation.description.match(/\b\d{12}\b/);
    if (match) {
      return match[0];
    }
  }

  return "Code-barres non détecté";
}
