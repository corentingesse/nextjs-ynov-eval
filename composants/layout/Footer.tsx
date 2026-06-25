import Link from "next/link";
import Logo from "../ui/Logo";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";

export default async function Footer() {
  const client = createClient();
  return (
    <footer className="bg-blue-dark px-6 py-12">
      <Logo />
      <nav className="mt-8">
        <ul className="flex flex-col gap-2 text-button">
          <li className="text-white hover:underline">
            <Link href="/mentions">Mentions légales</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
