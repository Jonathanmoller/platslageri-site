"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import JobImagesManager from "@/components/JobImagesManager";

type Job = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  job_images?: { id: string }[];
};

export default function AdminJobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  async function loadJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select(
        `
          id,
          title,
          description,
          image_url,
          job_images ( id )
        `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading jobs:", error);
      return;
    }

    setJobs(data ?? []);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort jobbet?",
    );

    if (!confirmed) return;

    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Kunde inte ta bort jobbet");
      return;
    }

    await loadJobs();
  };

  const handleEdit = (id: string, title: string, description: string) => {
    setEditingJobId(id);
    setEditTitle(title);
    setEditDescription(description);
  };

  const handleUpdate = async () => {
    if (!editingJobId) return;

    const { error } = await supabase
      .from("jobs")
      .update({
        title: editTitle,
        description: editDescription,
      })
      .eq("id", editingJobId);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setEditingJobId(null);
    setEditTitle("");
    setEditDescription("");

    await loadJobs();
  };

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-foreground">
        Befintliga jobb
      </h2>

      {jobs.map((job) => (
        <div
          key={job.id}
          className="mb-6 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm"
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="shrink-0">
              {job.image_url ? (
                <img
                  src={job.image_url}
                  alt={job.title}
                  className="h-40 w-full rounded-lg object-cover md:w-40"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center rounded-lg border border-border bg-background text-sm text-muted md:w-40">
                  Ingen bild
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold text-card-foreground">
                {job.title}
              </h3>

              <p className="mb-3 text-muted">
                {job.description || "Ingen beskrivning"}
              </p>

              <p className="mb-4 text-sm text-muted">
                Extra bilder: {job.job_images?.length ?? 0}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    handleEdit(job.id, job.title, job.description ?? "")
                  }
                  className="rounded bg-primary px-4 py-2 text-primary-foreground"
                >
                  Redigera
                </button>

                <button
                  onClick={() => handleDelete(job.id)}
                  className="rounded bg-danger px-4 py-2 text-danger-foreground"
                >
                  Ta bort
                </button>

                <button
                  onClick={() =>
                    setExpandedJobId(expandedJobId === job.id ? null : job.id)
                  }
                  className="rounded bg-secondary px-4 py-2 text-secondary-foreground"
                >
                  {expandedJobId === job.id ? "Dölj bilder" : "Hantera bilder"}
                </button>
              </div>

              {editingJobId === job.id && (
                <div className="mt-4 space-y-3 rounded-lg border border-border bg-background p-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Titel
                    </label>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded border border-border bg-card px-3 py-2 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Beskrivning
                    </label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full rounded border border-border bg-card px-3 py-2 text-foreground"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="rounded bg-primary px-4 py-2 text-primary-foreground"
                    >
                      Spara
                    </button>

                    <button
                      onClick={() => {
                        setEditingJobId(null);
                        setEditTitle("");
                        setEditDescription("");
                      }}
                      className="rounded bg-secondary px-4 py-2 text-secondary-foreground"
                    >
                      Avbryt
                    </button>
                  </div>
                </div>
              )}

              {expandedJobId === job.id && <JobImagesManager jobId={job.id} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
