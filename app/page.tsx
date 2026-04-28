export default function Home() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative h-125 flex items-center">
        {/* Background image */}
        <img
          src="/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Professionellt plåtslageri
          </h1>

          <p className="text-xl mb-6 max-w-2xl">
            Vi hjälper dig med tak, fasader och speciallösningar i plåt.
          </p>

          <a
            href="/contact"
            className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold"
          >
            Kontakta oss
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Våra tjänster</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded">
              <h3 className="font-bold text-xl mb-2">Tak</h3>
              <p>Plåttak och renovering</p>
            </div>

            <div className="p-6 bg-white shadow rounded">
              <h3 className="font-bold text-xl mb-2">Fasader</h3>
              <p>Fasadbeklädnad i plåt</p>
            </div>

            <div className="p-6 bg-white shadow rounded">
              <h3 className="font-bold text-xl mb-2">Specialjobb</h3>
              <p>Skräddarsydda lösningar</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}