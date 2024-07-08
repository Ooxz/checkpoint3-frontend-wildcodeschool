import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <h1>Checkpoint : frontend</h1>
      <Link href="/">Home</Link>
      <Link href="/countries">Countries</Link>
    </header>
  );
}