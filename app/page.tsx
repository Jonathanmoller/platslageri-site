import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">
          Våra tjänster
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">
              Takarbeten
            </h3>

            <p>
              Takplåt, skorstensbeslag och
              specialanpassade lösningar.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">
              Fasadarbeten
            </h3>

            <p>
              Plåtdetaljer och fasadlösningar
              för både privatpersoner och företag.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">
              Hängrännor & beslag
            </h3>

            <p>
              Montering och tillverkning av
              hängrännor, stuprör och beslag.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}