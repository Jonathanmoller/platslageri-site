"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleUpload = async () => {
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    // 1. Upload image
    const { error: uploadError } = await supabase.storage
      .from("jobs")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Fel vid upload");
      return;
    }

    // 2. Get public URL
    const { data: urlData } = supabase.storage
      .from("jobs")
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    // 3. Save to DB
    const { error: insertError } = await supabase.from("jobs").insert([
      {
        title,
        description: "Uploaded via admin",
        image_url: imageUrl,
      },
    ]);

    if (insertError) {
      console.error(insertError);
      alert("Fel vid sparande i DB");
      return;
    }

    alert("Upload klar!");

    // reset
    setTitle("");
    setFile(null);
  };

  return (
    <div>
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
      
      <button
        onClick={handleLogout}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logga ut
      </button>
    </div>
  );
}
