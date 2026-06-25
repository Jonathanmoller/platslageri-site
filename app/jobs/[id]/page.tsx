import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

type JobPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Hämta själva jobbet
  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (jobError || !job) {
    notFound();
  }

  // Hämta extra bilder till jobbet
  const { data: extraImages, error: imagesError } = await supabase
    .from("job_images")
    .select("*")
    .eq("job_id", id)
    .order("created_at", { ascending: true });

  if (imagesError) {
    console.error("Error loading job images:", imagesError);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

      {job.description && (
        <p className="text-lg text-gray-700 mb-8">{job.description}</p>
      )}

      {/* Huvudbild från jobs-tabellen */}
      {job.image_url && (
        <div className="mb-12">
          <img
            src={job.image_url}
            alt={job.title}
            className="w-full max-h-[500px] object-cover rounded-lg shadow"
          />
        </div>
      )}

      {/* Extra bilder */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Bilder från projektet</h2>

        {extraImages && extraImages.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {extraImages.map((image) => (
              <div
                key={image.id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={image.image_url}
                  alt={image.caption ?? job.title}
                  className="w-full h-72 object-cover"
                />

                {image.caption && (
                  <div className="p-4">
                    <p className="text-gray-700">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Inga extra bilder uppladdade ännu.</p>
        )}
      </section>
    </div>
  );
}
