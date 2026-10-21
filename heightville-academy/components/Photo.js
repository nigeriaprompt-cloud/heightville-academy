import Image from "next/image";
import { photos } from "@/data/photos";

// Renders a supplied photograph at its natural proportions (no cropping, no stretching).
export default function Photo({ name, alt, sizes = "(min-width:900px) 50vw, 100vw", priority = false, className = "" }) {
  const p = photos[name];
  return (
    <Image src={p.src} alt={alt} width={p.width} height={p.height} sizes={sizes}
      priority={priority} loading={priority ? undefined : "lazy"} className={className}
      style={{ width: "100%", height: "auto" }} />
  );
}
