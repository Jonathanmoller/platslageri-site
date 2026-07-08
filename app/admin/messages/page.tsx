import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminNav from "@/features/admin/components/AdminNav";
import AdminMessagesList from "@/features/admin/messages/components/AdminMessagesList";
import { getContactMessages } from "@/features/admin/messages/queries";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const messages = await getContactMessages(supabase);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Meddelanden</h1>
        <p className="mt-2 text-muted">
          Hantera kontaktförfrågningar från hemsidans formulär.
        </p>
      </div>

      <AdminNav />
      <AdminMessagesList initialMessages={messages} />
    </div>
  );
}
