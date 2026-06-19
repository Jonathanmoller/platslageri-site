"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminJobsList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  async function loadJobs() {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

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
          className="border rounded p-4 mb-4 flex gap-4 items-center"
        >
          <img
            src={job.image_url}
            alt={job.title}
            className="w-24 h-24 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-bold">{job.title}</h3>

            <p className="text-sm text-gray-600">{job.description}</p>
          </div>
          {editingJobId === job.id && (
            <div className="mt-4 space-y-2">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-2 w-full"
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="border p-2 w-full"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Spara
                </button>

                <button
                  onClick={() => setEditingJobId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Avbryt
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => handleEdit(job.id, job.title, job.description ?? "")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Redigera
          </button>
          <button
            onClick={() => handleDelete(job.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Ta bort
          </button>
        </div>
      ))}
    </div>
  );
}
