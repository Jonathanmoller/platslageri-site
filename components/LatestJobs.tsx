import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function LatestJobs() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">
          Senaste projekt
        </h2>

        <Link
          href="/gallery"
          className="text-blue-600 hover:underline"
        >
          Se alla →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={job.image_url}
              alt={job.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold mb-2">
                {job.title}
              </h3>

              <p className="text-sm text-gray-600">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}