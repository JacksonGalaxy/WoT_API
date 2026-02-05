import Link from "next/link";

async function getTanks() {
  const res = await fetch(
    `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.NEXT_PUBLIC_WG_APP_ID}&limit=20&tier=10&type=heavyTank`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return Object.values(json.data || {});
}

export default async function TanksPage() {
  const tanks: any[] = await getTanks();

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-6">Listado de Tanques</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tanks.map((tank) => (
          <Link
            key={tank.tank_id}
            href={`/tanks/${tank.tank_id}`}
            className="border border-green-500 rounded-xl p-4 hover:scale-105 transition text-center"
          >
            <img
              src={tank.images.small_icon}
              className="w-full h-28 object-contain mb-3"
            />
            <p>{tank.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}