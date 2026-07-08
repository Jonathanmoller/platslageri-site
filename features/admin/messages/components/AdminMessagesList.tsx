"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MessageItem from "@/features/admin/messages/components/MessageItem";
import type { ContactMessage } from "@/features/admin/messages/types";

type AdminMessagesListProps = {
  initialMessages: ContactMessage[];
};

type LoadingState = {
  id: string;
  action: "read" | "delete";
} | null;

function sortMessages(messages: ContactMessage[]) {
  return [...messages].sort((firstMessage, secondMessage) => {
    if (firstMessage.is_read !== secondMessage.is_read) {
      return firstMessage.is_read ? 1 : -1;
    }

    return (
      new Date(secondMessage.created_at).getTime() -
      new Date(firstMessage.created_at).getTime()
    );
  });
}

export default function AdminMessagesList({
  initialMessages,
}: AdminMessagesListProps) {
  const router = useRouter();
  const [messages, setMessages] = useState(() =>
    sortMessages(initialMessages),
  );
  const [loading, setLoading] = useState<LoadingState>(null);
  const [error, setError] = useState("");

  async function handleMarkAsRead(id: string) {
    setLoading({ id, action: "read" });
    setError("");

    const response = await fetch(`/api/admin/messages/${id}/read`, {
      method: "PATCH",
    });

    if (!response.ok) {
      setError("Kunde inte markera meddelandet som läst.");
      setLoading(null);
      return;
    }

    setMessages((currentMessages) =>
      sortMessages(
        currentMessages.map((message) =>
          message.id === id ? { ...message, is_read: true } : message,
        ),
      ),
    );
    setLoading(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort meddelandet?",
    );

    if (!confirmed) return;

    setLoading({ id, action: "delete" });
    setError("");

    const response = await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Kunde inte ta bort meddelandet.");
      setLoading(null);
      return;
    }

    setMessages((currentMessages) =>
      currentMessages.filter((message) => message.id !== id),
    );
    setLoading(null);
    router.refresh();
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-card-foreground">
          Inga meddelanden
        </h2>
        <p className="text-muted">
          Kontaktformuläret har inte tagit emot några meddelanden ännu.
        </p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded border border-border bg-card p-4 text-danger">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            loadingAction={
              loading?.id === message.id ? loading.action : null
            }
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}