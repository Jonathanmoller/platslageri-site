import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">
          Professionellt plåtslageri
          <br />
          i Höganäs med omnejd
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mb-8">
          Vi hjälper privatpersoner och företag med
          tak, fasader, hängrännor och specialanpassade
          plåtarbeten.
        </p>

        <div className="flex gap-4">
          <Link
            href="/contact"
            className="bg-white text-slate-900 px-6 py-3 rounded font-medium"
          >
            Kontakta oss
          </Link>

          <Link
            href="/gallery"
            className="border border-white px-6 py-3 rounded"
          >
            Se våra jobb
          </Link>
        </div>
      </div>
    </section>
  );
}