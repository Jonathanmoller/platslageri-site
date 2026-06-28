"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Något gick fel.");
        setLoading(false);
        return;
      }

      setSuccess(true);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-card-foreground">Tack!</h2>

        <p className="text-muted">
          Vi har tagit emot ditt meddelande och återkommer så snart vi kan.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold text-card-foreground">
        Skicka ett meddelande
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Namn *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
          required
        />

        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
        />

        <input
          type="tel"
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
        />

        <textarea
          placeholder="Meddelande *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
          rows={6}
          required
        />

        {error && <p className="text-danger font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Skickar..." : "Skicka meddelande"}
        </button>
      </div>
    </form>
  );
}
