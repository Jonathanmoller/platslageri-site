import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminUpload from "@/components/AdminUpload";

export default async function Admin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">
        Admin
      </h1>

      <AdminUpload />
    </div>
  );
}