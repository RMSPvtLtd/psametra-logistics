import Image from "next/image";
import { site } from "@/content/site";
/** Reserves the same dimensions for both supplied, unaltered brand variants. */
export function Brand() {
  return (
    <span className="brand">
      <Image
        className="logo-on-light"
        src={site.logo.light}
        width={1536}
        height={1024}
        sizes="126px"
        alt="Psametra"
        priority
      />
      <Image
        className="logo-on-dark"
        src={site.logo.dark}
        width={1536}
        height={1024}
        sizes="126px"
        alt="Psametra"
        priority
      />
    </span>
  );
}
