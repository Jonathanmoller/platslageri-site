import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground">Kontakta oss</h1>

        <p className="mt-3 max-w-2xl text-lg text-muted">
          Behöver du hjälp med tak, fasad, hängrännor eller andra plåtarbeten?
          Hör gärna av dig så återkommer vi så snart vi kan.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-card-foreground">
            Kontaktuppgifter
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-1 font-semibold text-card-foreground">
                Telefon
              </h3>

              <a href="tel:0708321393" className="text-primary hover:underline">
                070-832 13 93
              </a>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-card-foreground">
                E-post
              </h3>

              <a
                href="mailto:mollersplat@live.se"
                className="text-primary hover:underline"
              >
                mollersplat@live.se
              </a>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-card-foreground">
                Arbetsområde
              </h3>

              <p className="text-muted">Höganäs med omnejd</p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted">
                Vi hjälper både privatpersoner och företag med allt från mindre
                plåtarbeten till kompletta tak- och fasadlösningar.
              </p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
