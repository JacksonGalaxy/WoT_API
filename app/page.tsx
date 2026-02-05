import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl mb-6">Tanks Encyclopedia</h1>
      <Link href="/tanks" className="underline">
        Ir al listado de tanques
      </Link>
    </main>
  );
}