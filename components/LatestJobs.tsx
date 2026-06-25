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
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Senaste projekt</h2>

        <Link
          href="/gallery"
          className="font-medium text-primary hover:underline"
        >
          Se alla →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {jobs?.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {job.image_url ? (
              <img
                src={job.image_url}
                alt={job.title}
                className="h-56 w-full object-cover"
              />
            ) : (
              <div className="flex h-56 w-full items-center justify-center bg-background text-muted">
                Ingen bild
              </div>
            )}

            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-card-foreground">
                {job.title}
              </h3>

              <p className="text-sm text-muted">
                {job.description || "Ingen beskrivning"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
