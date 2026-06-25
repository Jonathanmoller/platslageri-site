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

    loadJobs();
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

    await loadJobs();
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Befintliga jobb</h2>

      {jobs.map((job) => (
        <div
          key={job.id}
          className="border rounded-xl p-4 mb-6 bg-white shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Bild */}
            <div className="shrink-0">
              {job.image_url ? (
                <img
                  src={job.image_url}
                  alt={job.title}
                  className="w-full md:w-40 h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full md:w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
                  Ingen bild
                </div>
              )}
            </div>

            {/* Innehåll */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>

              <p className="text-gray-600 mb-3">
                {job.description || "Ingen beskrivning"}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Extra bilder: {job.job_images?.length ?? 0}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    handleEdit(job.id, job.title, job.description ?? "")
                  }
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  Redigera
                </button>

                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Ta bort
                </button>

                <button
                  onClick={() =>
                    setExpandedJobId(expandedJobId === job.id ? null : job.id)
                  }
                  className="bg-slate-700 px-4 py-2 rounded"
                >
                  {expandedJobId === job.id ? "Dölj bilder" : "Hantera bilder"}
                </button>
              </div>

              {/* Edit-formulär */}
              {editingJobId === job.id && (
                <div className="mt-4 space-y-2">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                    rows={4}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 px-4 py-2 rounded"
                    >
                      Spara
                    </button>

                    <button
                      onClick={() => setEditingJobId(null)}
                      className="bg-gray-500 px-4 py-2 rounded"
                    >
                      Avbryt
                    </button>
                  </div>
                </div>
              )}

              {/* Bildhantering */}
              {expandedJobId === job.id && <JobImagesManager jobId={job.id} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
