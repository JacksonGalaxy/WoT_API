import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TankDetail({ params }: Props) {

  const { id } = await params;

  const key = process.env.NEXT_PUBLIC_WG_APP_ID;

  const res = await fetch(
    `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${key}`,
    { cache: "no-store" }
  );

  const json = await res.json();

  const tanks = Object.values(json.data || {});

  const tank: any = tanks.find(
    (t: any) => String(t.tank_id) === id
  );

  if (!tank) {
    return (
      <main className="min-h-screen bg-black text-red-500 p-8">
        Tank not found or API failed
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-green-400 p-8">
      <Link href="/tanks" className="underline mb-6 block">
        ← Volver
      </Link>

      <div className="flex gap-12 items-start">
        <img
          src={tank.images.big_icon}
          className="w-[420px]"
          alt={tank.name}
        />

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{tank.name}</h1>
          <p>Tier: {tank.tier}</p>
          <p>Tipo: {tank.type}</p>
          <p>Nación: {tank.nation}</p>
          <p>HP: {tank.default_profile?.hp ?? "N/A"}</p>
        </div>
      </div>
    </main>
  );
}
