"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Välj en bild först");
      return;
    }

    if (!title.trim()) {
      alert("Du måste ange en titel");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("jobs")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Fel vid upload");
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("jobs")
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    const { error: insertError } = await supabase.from("jobs").insert([
      {
        title,
        description,
        image_url: imageUrl,
      },
    ]);

    if (insertError) {
      console.error(insertError);
      alert("Fel vid sparande i databasen");
      setLoading(false);
      return;
    }

    alert("Jobbet laddades upp!");

    setTitle("");
    setDescription("");
    setFile(null);
    setLoading(false);

    router.refresh();
  };

  return (
    <div className="mb-10 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">
            Lägg till nytt jobb
          </h2>
          <p className="mt-1 text-sm text-muted">
            Skapa ett nytt jobb med titel, beskrivning och huvudbild.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded bg-danger px-4 py-2 text-danger-foreground"
        >
          Logga ut
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Titel
          </label>
          <input
            type="text"
            placeholder="T.ex. Takrenovering Höganäs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Bild
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-foreground file:mr-4 file:rounded file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-secondary-foreground"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Beskrivning
          </label>
          <textarea
            placeholder="Beskriv jobbet..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
            rows={5}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Laddar upp..." : "Ladda upp"}
        </button>
      </div>
    </div>
  );
}
