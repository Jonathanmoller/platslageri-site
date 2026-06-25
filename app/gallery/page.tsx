import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

// export const revalidate = 60; // för prod
export const dynamic = "force-dynamic"; // för development

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
    <div className="mx-auto mt-10 max-w-6xl px-6 pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tidigare jobb</h1>
        <p className="mt-2 text-muted">
          Ett urval av projekt och plåtarbeten vi har utfört.
        </p>
      </div>

      {jobs && jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {jobs.map((job) => (
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
      ) : (
        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
          <p className="text-muted">Det finns inga jobb uppladdade ännu.</p>
        </div>
      )}
    </div>
  );
}
