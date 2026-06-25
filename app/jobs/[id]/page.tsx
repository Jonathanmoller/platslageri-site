import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Link from "next/link";

type JobPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (jobError || !job) {
    notFound();
  }

  const { data: extraImages, error: imagesError } = await supabase
    .from("job_images")
    .select("*")
    .eq("job_id", id)
    .order("created_at", { ascending: true });

  if (imagesError) {
    console.error("Error loading job images:", imagesError);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/gallery"
          className="mb-4 inline-block font-medium text-primary hover:underline"
        >
          ← Tillbaka till galleri
        </Link>

        <h1 className="mb-4 text-4xl font-bold text-foreground">{job.title}</h1>

        {job.description && (
          <p className="max-w-3xl text-lg text-muted">{job.description}</p>
        )}
      </div>

      {job.image_url && (
        <div className="mb-12 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <img
            src={job.image_url}
            alt={job.title}
            className="max-h-[520px] w-full object-cover"
          />
        </div>
      )}

      <section>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Bilder från projektet
        </h2>

        {extraImages && extraImages.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {extraImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm"
              >
                <img
                  src={image.image_url}
                  alt={image.caption ?? job.title}
                  className="h-72 w-full object-cover"
                />

                <div className="p-4">
                  <p className="text-muted">
                    {image.caption || "Ingen bildtext"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <p className="text-muted">Inga extra bilder uppladdade ännu.</p>
          </div>
        )}
      </section>
    </div>
  );
}
