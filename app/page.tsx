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

const utilityCategories = [
  { id: "07", name: "Legal" },
  { id: "08", name: "Contact" },
];

export default function Home() {
  const [entryStage, setEntryStage] = useState<0 | 1 | 2>(0);
  const hasEntered = entryStage === 2;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeCategory = categories.find((category) => category.id === activeId);
  const activeIndex = categories.findIndex((category) => category.id === activeId);

  const toggleCategory = (id: string) => {
    if (id === "01") {
      setActiveId("01");
      setDetailId("01");
      return;
    }

    setDetailId(null);
    setActiveId((current) => (current === id ? null : id));
  };

  const moveCategory = (direction: number) => {
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    const nextIndex = (currentIndex + direction + categories.length) % categories.length;
    setDetailId(null);
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
    <>
      <div
        className={`entry-sequence${entryStage >= 1 ? " has-announcement" : ""}${hasEntered ? " is-entered" : ""}`}
        aria-hidden={hasEntered}
      >
      <button
        className="entry-screen"
        type="button"
        aria-label="Show the Yoshi and Moshi tour announcement"
        aria-hidden={entryStage !== 0}
        tabIndex={entryStage === 0 ? 0 : -1}
        onClick={() => setEntryStage(1)}
      >
        <img
          className="entry-background"
          src="entry-no-humor.png"
          alt="Yoshi and Moshi lying on a bed in a red room"
          draggable={false}
        />
        <span className="entry-shade" aria-hidden="true" />
        <span className="entry-message">
          <strong>No humor<br />= no entry</strong>
          <img src="entry-red-cross.png" alt="" draggable={false} />
        </span>
        <span className="entry-action">Click or tap for breaking news</span>
      </button>

      <button
        className="tour-announcement"
        type="button"
        aria-label="Enter the Become a Legend exhibition"
        aria-hidden={entryStage !== 1}
        tabIndex={entryStage === 1 ? 0 : -1}
        onClick={() => setEntryStage(2)}
      >
        <span className="tour-dimmer" aria-hidden="true" />
        <span className="tour-poster">
          <img
            className="tour-background"
            src="yoshi-moshi-red-boat.png"
            alt="Yoshi and Moshi with a red boat in the jungle"
            draggable={false}
          />
          <span className="tour-shade" aria-hidden="true" />
          <span className="tour-marquee tour-marquee-top" aria-hidden="true">
            HONK! HONK! &nbsp; THE LEGENDS ARE ON THE MOVE &nbsp; HONK! HONK! &nbsp; THE LEGENDS ARE ON THE MOVE
          </span>
          <span className="tour-headline">
            <strong>Yoshi + Moshi</strong>
            <strong>are coming to</strong>
            <strong>your town!</strong>
          </span>
          <span className="tour-badge tour-badge-left" aria-hidden="true">LIVE!</span>
          <span className="tour-badge tour-badge-right" aria-hidden="true">SOON!</span>
          <span className="tour-enter">Click again — make way!</span>
        </span>
      </button>
      </div>

    <main
      className={`site-shell${hasEntered ? " is-revealed" : ""}`}
      aria-hidden={!hasEntered}
      inert={!hasEntered}
    >
      <header className="masthead">
        <a className="wordmark" href="#model" aria-label="Yoshi und Moshi – zum Ausstellungsmodell">
          <span className="wordmark-main">YOSHI<span>+</span>MOSHI</span>
          <span className="wordmark-subtitle">Become a Legend</span>
        </a>
        <div className="exhibition-title">
          <span>Exhibition Plan</span>
          <span>Move or tab to explore</span>
        </div>
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <nav className={`site-menu${menuOpen ? " is-open" : ""}`} id="site-menu" aria-label="Exhibition menu">
        <div className="site-menu-heading">
          <span>Become a Legend</span>
          <strong>Exhibition Plan</strong>
        </div>
        {categories.map((category) => (
          <a
            href="#model"
            key={category.id}
            onClick={() => {
              setActiveId(category.id);
              setDetailId(category.id === "01" ? "01" : null);
              setMenuOpen(false);
            }}
          >
            <span>{category.id}</span>
            <strong>{category.name}</strong>
          </a>
        ))}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            setActiveId(null);
            setDetailId(null);
            setEntryStage(0);
          }}
        >
          Replay intro
        </button>
      </nav>

      <section className="model-section" id="model" aria-label="Interactive exhibition model">
        <div className="exhibition-layout">
          <div className="model-column">
        {detailId === "01" ? (
          <article className="category-detail category-detail-01" aria-labelledby="category-detail-title">
            <div className="detail-copy">
              <span className="detail-number">01</span>
              <p className="detail-kicker">Become a Legend / Category</p>
              <h1 id="category-detail-title">Bla-Bla-Bla</h1>
              <p className="detail-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <img
              className="detail-cutout"
              src="closeup-u1-cutout.png"
              alt="Freigestellte Figur der Kategorie Bla-Bla-Bla"
              draggable={false}
            />

            <button
              className="detail-back"
              type="button"
              onClick={() => {
                setDetailId(null);
                setActiveId(null);
              }}
            >
              <span aria-hidden="true">←</span> Back to model
            </button>
          </article>
        ) : (
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

          <span className="funded-button" aria-label="Fully funded">Fully funded!</span>

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
        )}

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
                onClick={() => {
                  setActiveId(category.id);
                  setDetailId(category.id === "01" ? "01" : null);
                }}
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

        <section className="closeup-grid" aria-label="Exhibition categories and information">
          {categories.map((category, index) => {
            const isActive = category.id === activeId;
            return (
              <figure
                className={`closeup-card${isActive ? " is-active" : ""}`}
                key={category.id}
                onMouseEnter={() => setActiveId(category.id)}
                onMouseLeave={() => {
                  if (!detailId) setActiveId(null);
                }}
                onClick={() => toggleCategory(category.id)}
              >
                <button
                  className="closeup-label"
                  type="button"
                  aria-pressed={isActive}
                  onFocus={() => setActiveId(category.id)}
                >
                  <span>{category.id}</span>
                  <strong>{category.name}</strong>
                </button>
                {category.closeup ? (
                  <div className="closeup-media">
                    <img
                      className="closeup-image"
                      src={category.closeup.src}
                      alt={category.closeup.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
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
          {utilityCategories.map((category) => (
            <button
              className="closeup-card utility-card"
              key={category.id}
              type="button"
              aria-label={`${category.id}: ${category.name}`}
            >
              <span>{category.id}</span>
              <strong>{category.name}</strong>
              <small>Information</small>
            </button>
          ))}
        </section>
        </div>
      </section>

      <footer className="site-footer">
        <span>Yoshi + Moshi</span>
        <span>Nina Staehli</span>
      </footer>
    </main>
    </>
  );
}
