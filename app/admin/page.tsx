import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminUpload from "@/components/AdminUpload";
import AdminJobsList from "@/components/AdminJobsList";

export default async function Admin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin</h1>
        <p className="mt-2 text-muted">
          Hantera projekt, bilder och innehåll för hemsidan.
        </p>
      </div>

      <AdminUpload />
      <AdminJobsList />
    </div>
  );
}
