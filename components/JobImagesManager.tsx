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

    const { error: uploadError } = await supabase.storage
      .from("jobs")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Kunde inte ladda upp bild");
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("jobs")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

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
    <div className="mt-6 border-t border-border pt-6">
      <h4 className="mb-4 text-lg font-bold text-foreground">Extra bilder</h4>

      <div className="mb-6 rounded-lg border border-border bg-background p-4">
        <div className="space-y-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-foreground file:mr-4 file:rounded file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-secondary-foreground"
          />

          <input
            type="text"
            placeholder="Bildtext, t.ex. Före arbetet"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded border border-border bg-card px-3 py-2 text-foreground"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Laddar upp..." : "Ladda upp bild"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {images.length === 0 ? (
          <p className="text-sm text-muted">
            Inga extra bilder uppladdade ännu.
          </p>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 text-card-foreground"
            >
              <img
                src={image.image_url}
                alt={image.caption ?? "Jobbbild"}
                className="h-24 w-24 rounded object-cover"
              />

              <div className="flex-1">
                <p className="font-medium text-card-foreground">
                  {image.caption || "Ingen bildtext"}
                </p>
              </div>

              <button
                onClick={() => handleDelete(image.id)}
                className="rounded bg-danger px-3 py-2 text-danger-foreground"
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
