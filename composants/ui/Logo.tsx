import Image from "next/image";
import Link from "next/link";

type LogoType = {
  size?: number;
};

export default function Logo({ size = 90 }: LogoType) {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="logo"
        width="90"
        height="24"
        style={{ width: size }}
      />
    </Link>
  );
}
