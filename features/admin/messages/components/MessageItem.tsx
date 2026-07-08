"use client";

import type { ContactMessage } from "@/features/admin/messages/types";

type MessageItemProps = {
  message: ContactMessage;
  loadingAction: "read" | "delete" | null;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatMessageDate(value: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function MessageItem({
  message,
  loadingAction,
  onMarkAsRead,
  onDelete,
}: MessageItemProps) {
  const phoneHref = message.phone
    ? `tel:${message.phone.replace(/\s+/g, "")}`
    : null;

  return (
    <article className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-card-foreground">
              {message.name}
            </h2>

            {!message.is_read && (
              <span className="rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                Oläst
              </span>
            )}
          </div>

          <p className="text-sm text-muted">
            {formatMessageDate(message.created_at)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {!message.is_read && (
            <button
              type="button"
              onClick={() => onMarkAsRead(message.id)}
              disabled={loadingAction !== null}
              className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {loadingAction === "read" ? "Markerar..." : "Markera som läst"}
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(message.id)}
            disabled={loadingAction !== null}
            className="rounded bg-danger px-4 py-2 text-sm font-medium text-danger-foreground disabled:opacity-50"
          >
            {loadingAction === "delete" ? "Tar bort..." : "Ta bort"}
          </button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 border-y border-border py-4 text-sm md:grid-cols-2">
        <div>
          <p className="mb-1 font-medium text-foreground">E-post</p>
          {message.email ? (
            <a
              href={`mailto:${message.email}`}
              className="text-primary hover:underline"
            >
              {message.email}
            </a>
          ) : (
            <p className="text-muted">Ej angivet</p>
          )}
        </div>

        <div>
          <p className="mb-1 font-medium text-foreground">Telefon</p>
          {message.phone && phoneHref ? (
            <a href={phoneHref} className="text-primary hover:underline">
              {message.phone}
            </a>
          ) : (
            <p className="text-muted">Ej angivet</p>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium text-foreground">Meddelande</p>
        <p className="whitespace-pre-wrap text-muted">{message.message}</p>
      </div>
    </article>
  );
}
