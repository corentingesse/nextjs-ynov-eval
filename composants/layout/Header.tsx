"use client";
import Link from "next/link";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="bg-blue-dark flex items-center gap-5 py-6 px-14">
      <Logo />

      <nav className="flex-1">
        <ul className="flex items-center justify-end gap-5">
          <li>
            <Link href="/websites">Sites web</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Link href="/profil">
        <span className="material-symbols-outlined text-white text-3xl cursor-pointer">
          account_circle
        </span>
      </Link>
    </header>
  );
}
