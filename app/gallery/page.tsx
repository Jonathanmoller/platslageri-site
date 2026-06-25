import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

//export const revalidate = 60; //for prod.
export const dynamic = "force-dynamic"; //for development.

export default async function Gallery() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Tidigare jobb</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="bg-white shadow rounded overflow-hidden block hover:shadow-lg transition"
          >
            <img
              src={job.image_url}
              alt={job.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
