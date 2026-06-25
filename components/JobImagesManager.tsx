"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type JobImagesManagerProps = {
  jobId: string;
};

type JobImage = {
  id: string;
  image_url: string;
  caption: string | null;
};

export default function JobImagesManager({ jobId }: JobImagesManagerProps) {
  const [images, setImages] = useState<JobImage[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadImages() {
    const { data, error } = await supabase
      .from("job_images")
      .select("*")
      .eq("job_id", jobId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading job images:", error);
      return;
    }

    setImages(data ?? []);
  }

  useEffect(() => {
    loadImages();
  }, [jobId]);

  const handleUpload = async () => {
    if (!file) {
      alert("Välj en bild först");
      return;
    }

    setLoading(true);

    const fileName = `${jobId}/${Date.now()}-${file.name}`;

    // 1. Upload till Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("jobs")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Kunde inte ladda upp bild");
      setLoading(false);
      return;
    }

    // 2. Hämta public URL
    const { data: publicUrlData } = supabase.storage
      .from("jobs")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 3. Spara i job_images
    const { error: insertError } = await supabase.from("job_images").insert([
      {
        job_id: jobId,
        image_url: imageUrl,
        caption,
      },
    ]);

    if (insertError) {
      console.error(insertError);
      alert("Kunde inte spara bilden i databasen");
      setLoading(false);
      return;
    }

    setFile(null);
    setCaption("");
    setLoading(false);

    await loadImages();
  };

  const handleDelete = async (imageId: string) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort bilden?",
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("job_images")
      .delete()
      .eq("id", imageId);

    if (error) {
      console.error(error);
      alert("Kunde inte ta bort bilden");
      return;
    }

    await loadImages();
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-bold mb-3">Extra bilder</h4>

      <div className="space-y-3 mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block"
        />

        <input
          type="text"
          placeholder="Bildtext, t.ex. Före arbetet"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Laddar upp..." : "Ladda upp bild"}
        </button>
      </div>

      <div className="space-y-4">
        {images.length === 0 ? (
          <p className="text-sm text-gray-500">
            Inga extra bilder uppladdade ännu.
          </p>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="border rounded p-3 flex gap-4 items-center"
            >
              <img
                src={image.image_url}
                alt={image.caption ?? "Jobbbild"}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">
                  {image.caption || "Ingen bildtext"}
                </p>
              </div>

              <button
                onClick={() => handleDelete(image.id)}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Ta bort
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
