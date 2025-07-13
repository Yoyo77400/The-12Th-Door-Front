"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/ocr", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.text || "Aucun texte trouvé");
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleUpload}>Scanner le billet</Button>
      {result && <p className="mt-4">📎 Code détecté : {result}</p>}
    </div>
  );
}
