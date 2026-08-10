"use client";

import { useRef, useState } from "react";

type Category = {
  id: string;
  name: string;
  point: { x: number; y: number };
  outline: string;
  closeup?: {
    src: string;
    alt: string;
  };
};

const categories: Category[] = [
  {
    id: "01",
    name: "Bla-Bla-Bla",
    point: { x: 18.7, y: 56 },
    closeup: {
      src: "closeup-u1-white.webp",
      alt: "Close-up of a pale Bla-Bla-Bla figure with paper ribbons",
    },
    outline:
      "M3 39 C9 34 17 32 23 37 C28 43 31 58 30 66 C28 73 18 75 8 73 C3 70 1 61 3 39 Z",
  },
  {
    id: "02",
    name: "Movement-Dancers",
    point: { x: 33.1, y: 57.4 },
    closeup: {
      src: "closeup-u2-white.webp",
      alt: "Close-up of a suspended Movement-Dancer with a black head and knitted costume",
    },
    outline:
      "M25 36 C30 34 38 34 40 39 C42 48 43 63 41 68 C37 73 29 72 26 68 C24 60 22 46 25 36 Z",
  },
  {
    id: "03",
    name: "Big Heads",
    point: { x: 47.2, y: 71.9 },
    closeup: {
      src: "closeup-u3-white.webp",
      alt: "Close-up of a Big Heads sculpture with black vessels and a pale spherical face",
    },
    outline:
      "M37 59 C42 55 52 55 55 59 C58 65 58 77 54 81 C49 84 40 82 37 79 C34 73 34 64 37 59 Z",
  },
  {
    id: "04",
    name: "Performers",
    point: { x: 74, y: 66.6 },
    closeup: {
      src: "closeup-u4-white.webp",
      alt: "Close-up of a seated black Performer holding a pale wooden figure",
    },
    outline:
      "M67 56 C73 52 83 52 87 57 C89 64 90 75 86 79 C80 83 70 81 67 77 C64 71 63 62 67 56 Z",
  },
  {
    id: "05",
    name: "Wooden Rebels",
    point: { x: 61.2, y: 69.4 },
    closeup: {
      src: "closeup-u5-white.webp",
      alt: "Close-up of a suspended pale wooden rebel with black and silver costume",
    },
    outline:
      "M54 59 C58 56 67 55 70 59 C72 65 72 76 69 80 C64 83 56 82 53 78 C51 72 50 64 54 59 Z",
  },
  {
    id: "06",
    name: "The Climb",
    point: { x: 74.8, y: 49.8 },
    closeup: {
      src: "closeup-u6-white.webp",
      alt: "Close-up of a suspended black figure from The Climb",
    },
    outline:
      "M67 39 C71 35 78 34 81 38 C84 45 85 57 82 62 C78 67 70 65 67 61 C64 55 63 45 67 39 Z",
  },
];

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const activeCategory = categories.find((category) => category.id === activeId);
  const activeIndex = categories.findIndex((category) => category.id === activeId);

  const toggleCategory = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  const moveCategory = (direction: number) => {
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    const nextIndex = (currentIndex + direction + categories.length) % categories.length;
    setActiveId(categories[nextIndex].id);
  };

  const finishSwipe = (clientX: number) => {
    if (touchStartX.current === null) return;
    const distance = clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;
    moveCategory(distance < 0 ? 1 : -1);
  };

  return (
    <main className="site-shell">
      <header className="masthead">
        <a className="wordmark" href="#model" aria-label="Yoshi und Moshi – zum Ausstellungsmodell">
          YOSHI<span>+</span>MOSHI
        </a>
        <div className="exhibition-title">
          <span>Become a Legend</span>
          <span>Exhibition model · Six categories</span>
        </div>
        <p className="instruction">
          <span className="instruction-dot" aria-hidden="true" />
          Move or tap to explore
        </p>
      </header>

      <section className="model-section" id="model" aria-label="Interactive exhibition model">
        <div className="exhibition-layout">
          <div className="model-column">
        <div
          className={`model-frame${activeCategory ? " has-active" : ""}`}
          onMouseLeave={() => setActiveId(null)}
        >
          <img
            className="model-image model-image-base"
            src="yoshi-moshi-model.jpg"
            alt="Yoshi and Moshi presenting a miniature exhibition model with six groups of figures"
            draggable={false}
          />

          <svg
            className="hotspot-map"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {categories.map((category) => (
              <path
                key={category.id}
                className="hotspot-hit-area"
                d={category.outline}
                onMouseEnter={() => setActiveId(category.id)}
                onClick={() => toggleCategory(category.id)}
              />
            ))}
            {activeCategory ? (
              <g className="ink-frame">
                <path className="ink-frame-stroke" d={activeCategory.outline} />
                <path className="ink-frame-flecks" d={activeCategory.outline} />
                <g className="ink-splatter">
                  <circle cx={activeCategory.point.x - 7.4} cy={activeCategory.point.y - 10.2} r="0.58" />
                  <circle cx={activeCategory.point.x - 5.7} cy={activeCategory.point.y - 11.5} r="0.26" />
                  <circle cx={activeCategory.point.x - 4.3} cy={activeCategory.point.y - 10.7} r="0.17" />
                  <circle cx={activeCategory.point.x + 8.1} cy={activeCategory.point.y + 7.6} r="0.48" />
                  <circle cx={activeCategory.point.x + 9.5} cy={activeCategory.point.y + 6.4} r="0.2" />
                  <path
                    className="ink-drip"
                    d={`M ${activeCategory.point.x - 7.5} ${activeCategory.point.y - 9.8} v 4.2 M ${activeCategory.point.x - 5.8} ${activeCategory.point.y - 10.5} v 2.4 M ${activeCategory.point.x + 8.2} ${activeCategory.point.y + 7.3} v 3.1`}
                  />
                </g>
              </g>
            ) : null}
          </svg>

          {categories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                className={`image-marker${isActive ? " is-active" : ""}`}
                style={{ left: `${category.point.x}%`, top: `${category.point.y}%` }}
                type="button"
                aria-label={`${category.id}: ${category.name}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
                onClick={() => toggleCategory(category.id)}
              >
                <span className="marker-number">{category.id}</span>
                <span className="marker-name">{category.name}</span>
              </button>
            );
          })}

          <img
            className={`idle-logo${activeCategory ? " is-hidden" : ""}`}
            src="yoshi-moshi-logo.webp"
            alt="Yoshi + Moshi"
            draggable={false}
          />

          <div className={`active-caption${activeCategory ? " is-visible" : ""}`} aria-live="polite">
            <span>{activeCategory?.id ?? "00"}</span>
            <strong>{activeCategory?.name ?? "Choose a category"}</strong>
          </div>
        </div>

          </div>

        <section className="mobile-explorer" aria-label="Mobile category explorer">
          <nav className="mobile-category-nav" aria-label="Choose a category">
            {categories.map((category) => (
              <button
                className={category.id === activeId ? "is-active" : ""}
                key={category.id}
                type="button"
                aria-label={`${category.id}: ${category.name}`}
                aria-pressed={category.id === activeId}
                onClick={() => setActiveId(category.id)}
              >
                {category.id}
              </button>
            ))}
          </nav>

          <div
            className={`mobile-detail${activeCategory ? " has-selection" : ""}`}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => finishSwipe(event.changedTouches[0]?.clientX ?? 0)}
            onTouchCancel={() => {
              touchStartX.current = null;
            }}
          >
            {activeCategory ? (
              <>
                <header className="mobile-detail-header">
                  <span>{activeCategory.id}</span>
                  <strong>{activeCategory.name}</strong>
                </header>

                {activeCategory.closeup ? (
                  <img
                    className="mobile-detail-image"
                    src={activeCategory.closeup.src}
                    alt={activeCategory.closeup.alt}
                    draggable={false}
                  />
                ) : (
                  <div className="mobile-detail-placeholder">
                    <span>{`U${activeIndex + 1}`}</span>
                    <small>Close-up folgt</small>
                  </div>
                )}

                <footer className="mobile-detail-controls">
                  <button type="button" aria-label="Previous category" onClick={() => moveCategory(-1)}>
                    ←
                  </button>
                  <span>Wischen zum Wechseln</span>
                  <button type="button" aria-label="Next category" onClick={() => moveCategory(1)}>
                    →
                  </button>
                </footer>
              </>
            ) : (
              <button className="mobile-detail-empty" type="button" onClick={() => setActiveId(categories[0].id)}>
                <span>01—06</span>
                <strong>Kategorie antippen</strong>
              </button>
            )}
          </div>
        </section>

        <section className="closeup-grid" aria-label="Close-ups of the six subcategories">
          {categories.map((category, index) => {
            const isActive = category.id === activeId;
            return (
              <figure
                className={`closeup-card${isActive ? " is-active" : ""}`}
                key={category.id}
                onMouseEnter={() => setActiveId(category.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <button
                  className="closeup-label"
                  type="button"
                  aria-pressed={isActive}
                  onFocus={() => setActiveId(category.id)}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>{category.id}</span>
                  <strong>{category.name}</strong>
                </button>
                {category.closeup ? (
                  <img
                    className="closeup-image"
                    src={category.closeup.src}
                    alt={category.closeup.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <div className="closeup-placeholder" aria-hidden="true">
                    <span>{`U${index + 1}`}</span>
                    <small>Close-up</small>
                  </div>
                )}
                <figcaption className="visually-hidden">
                  {`U${index + 1}: ${category.name}`}
                </figcaption>
              </figure>
            );
          })}
        </section>
        </div>
      </section>

      <footer className="site-footer">
        <span>Yoshi + Moshi</span>
        <span>Nina Staehli</span>
      </footer>
    </main>
  );
}
