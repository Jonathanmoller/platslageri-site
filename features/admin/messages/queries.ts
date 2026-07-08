import type { createClient } from "@/lib/supabase-server";
import type { ContactMessage } from "@/features/admin/messages/types";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export async function getContactMessages(
  supabase: SupabaseServerClient,
): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, phone, message, is_read, created_at")
    .order("is_read", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getUnreadMessagesCount(
  supabase: SupabaseServerClient,
): Promise<number> {
  const { count, error } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("is_read", false);

  if (error) {
    throw error;
  }

  return count ?? 0;
}
