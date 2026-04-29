"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    // 1. Upload image
    const { data, error } = await supabase.storage
      .from("jobs")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return;
    }

    // 2. Get public URL
    const { data: urlData } = supabase.storage
      .from("jobs")
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    // 3. Save to database
    await supabase.from("jobs").insert([
      {
        title,
        image_url: imageUrl,
        description: "Uploaded via admin",
      },
    ]);

    alert("Upload klar!");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Lägg till jobb
      </h1>

      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ladda upp
      </button>
    </div>
  );
}