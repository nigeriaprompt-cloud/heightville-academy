"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Gallery({ items }) {
  const [index, setIndex] = useState(null);
  const touchStart = useRef(null);
  const closeRef = useRef(null);
  const last = useRef(null);
  const close = useCallback(() => { setIndex(null); last.current?.focus(); }, []);
  const step = useCallback((d) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, close, step]);

  const current = index === null ? null : items[index];
  return (
    <>
      <ul className="masonry">
        {items.map((img, i) => (
          <li key={img.id}>
            <button type="button" className="tile" aria-label={`Open photo: ${img.alt}`}
              onClick={(e) => { last.current = e.currentTarget; setIndex(i); }}>
              {/* Natural width/height reserve space and preserve the original ratio. */}
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                loading={i < 3 ? "eager" : "lazy"} style={{ width: "100%", height: "auto" }} />
              <span className="tile-cap">{img.category}</span>
            </button>
          </li>
        ))}
      </ul>
      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"
          onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}>
          <button ref={closeRef} className="lb-btn lb-close" onClick={close} aria-label="Close viewer"><X /></button>
          <button className="lb-btn lb-prev" onClick={() => step(-1)} aria-label="Previous photo"><ChevronLeft /></button>
          <figure>
            <Image src={current.src} alt={current.alt} width={current.width} height={current.height}
              sizes="100vw" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "78vh" }} />
            <figcaption>{current.caption} · {index + 1} / {items.length}</figcaption>
          </figure>
          <button className="lb-btn lb-next" onClick={() => step(1)} aria-label="Next photo"><ChevronRight /></button>
        </div>
      )}
    </>
  );
}
