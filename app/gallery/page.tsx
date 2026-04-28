import { supabase } from "@/lib/supabase";

export default async function Gallery() {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Tidigare jobb
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {jobs?.map((job) => (
          <div key={job.id} className="bg-white shadow rounded overflow-hidden">

            <img
              src={job.image_url}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.description}
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}