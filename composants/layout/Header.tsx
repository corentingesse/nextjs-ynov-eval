"use client";
import Link from "next/link";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="bg-background flex items-center gap-5 py-4 px-14">
      <Logo />

      <nav className="flex-1">
        <ul className="flex items-center justify-end gap-5">
          <li>
            <Link href="/websites">Sites web</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hidden md:block flex-1">
            <form
              role="search"
              className="w-full flex gap-2 items-center bg-soft rounded-md p-2"
            >
              <button type="submit" className="flex">
                <span className="material-symbols-outlined">search</span>
              </button>
              <input
                type="search"
                placeholder="Rechercher par tags"
                className="flex-1"
              />
            </form>
          </li>
          <li>
            <ul className="flex gap-1 border rounded p-1 text-tiny">
              <li className="pr-1 border-r">EN</li>
              <li className="font-bold">FR</li>
            </ul>
          </li>
        </ul>
      </nav>

      <span className="material-symbols-outlined text-white text-3xl cursor-pointer">
        account_circle
      </span>
    </header>
  );
}
