"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminJobsList() {
  const [jobs, setJobs] = useState<any[]>([]);

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
