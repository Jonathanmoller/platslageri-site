import Hero from "@/components/Hero";
import LatestJobs from "@/components/LatestJobs";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">Våra tjänster</h2>
          <p className="mt-2 text-muted">
            Vi utför plåtarbeten för tak, fasader och detaljer runt huset –
            alltid med fokus på hållbara lösningar och ett snyggt slutresultat.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-2 text-xl font-bold text-card-foreground">
              Takarbeten
            </h3>

            <p className="text-muted">
              Takplåt, skorstensbeslag och specialanpassade lösningar för både
              renovering och nyproduktion.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-2 text-xl font-bold text-card-foreground">
              Fasadarbeten
            </h3>

            <p className="text-muted">
              Plåtdetaljer och fasadlösningar för både privatpersoner och
              företag, anpassade efter byggnadens behov.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-2 text-xl font-bold text-card-foreground">
              Hängrännor & beslag
            </h3>

            <p className="text-muted">
              Montering och tillverkning av hängrännor, stuprör, beslag och
              andra viktiga detaljer för ett hållbart resultat.
            </p>
          </div>
        </div>
      </section>

      <LatestJobs />
    </>
  );
}
