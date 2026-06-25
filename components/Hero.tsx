import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-border bg-slate-900 text-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
          Professionellt plåtslageri
          <br />i Höganäs med omnejd
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-slate-300 sm:text-xl dark:text-slate-200">
          Vi hjälper privatpersoner och företag med tak, fasader, hängrännor och
          specialanpassade plåtarbeten.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded bg-white px-6 py-3 font-medium text-slate-900 transition hover:opacity-90"
          >
            Kontakta oss
          </Link>

          <Link
            href="/gallery"
            className="rounded border border-white px-6 py-3 font-medium text-white transition hover:bg-white hover:text-slate-900"
          >
            Se våra jobb
          </Link>
        </div>
      </div>
    </section>
  );
}
