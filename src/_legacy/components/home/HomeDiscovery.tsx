import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers3, UsersRound, Sparkles } from "lucide-react";
import { useShowcase } from "../../lib/showcase";
import { useWork } from "../../lib/work";
import { getSupermarketFlyers, type Flyer } from "../../services/flyerService";
import "./HomeDiscovery.css";

export function HomeDiscovery() {
  const { entries, loading, error, retry } = useShowcase();
  const { collections } = useWork();
  const projectPath = (entry: (typeof entries)[number]) => {
    const collection = collections.find(c => c.brands.some(b => b.slug === entry.slug));
    return entry.project_path || (collection ? `/portfolio/${collection.slug}/${entry.slug}` : "/portfolio");
  };
  const [active, setActive] = useState("");
  const highlights = entries.slice(0, 4);
  const selected = highlights.find((entry) => entry.slug === active) || highlights[0];
  return (
    <>
      <section className="home-discovery hd-featured" aria-label="Featured work preview">
        <div className="hd-heading">
          <div>
            <span className="hd-kicker">A FEW THINGS WE’VE MADE</span>
            <h2>
              Different brands.
              <br />
              <em>Distinct impressions.</em>
            </h2>
          </div>
          <Link className="hd-link" to="/portfolio">
            Enter our work <ArrowUpRight size={18} />
          </Link>
        </div>
        {loading && (
          <div className="hd-loading" role="status">
            Loading selected work…
          </div>
        )}
        {error && (
          <p role="alert">
            Work previews are temporarily unavailable. <button onClick={retry}>Try again</button>
          </p>
        )}
        {!loading && !error && !selected && (
          <Link className="hd-link" to="/portfolio?view=gallery">
            Explore our published work <ArrowUpRight size={18} />
          </Link>
        )}
        {selected && (
          <div className="hd-editorial">
            <Link
              to={projectPath(selected)}
              className="hd-art"
              aria-label={`Explore ${selected.client_name}`}
            >
              {highlights.map((entry) => {
                const image = entry.media_type === "video" ? entry.poster_url : entry.media_url;
                const mobileImage = entry.mobile_media_url
                  ? (entry.mobile_media_type || entry.media_type) === "video"
                    ? entry.mobile_poster_url
                    : entry.mobile_media_url
                  : null;
                return (
                  <picture
                    key={entry.slug}
                    className={`hd-frame ${entry.slug === selected.slug ? "is-active" : ""}`}
                    aria-hidden={entry.slug !== selected.slug}
                    style={
                      {
                        "--hd-focal": `${entry.focal_x}% ${entry.focal_y}%`,
                        "--hd-mobile-focal": `${entry.mobile_focal_x ?? entry.focal_x}% ${entry.mobile_focal_y ?? entry.focal_y}%`,
                      } as React.CSSProperties
                    }
                  >
                    {mobileImage && <source media="(max-width:700px)" srcSet={mobileImage} />}
                    <img
                      src={image || undefined}
                      alt={entry.alt_text}
                      loading="eager"
                      decoding="async"
                    />
                  </picture>
                );
              })}
              <span className="hd-art-arrow">
                <ArrowUpRight />
              </span>
            </Link>
            <div className="hd-selection">
              <div className="hd-copy-stack">
                {highlights.map((entry) => (
                  <div
                    key={entry.slug}
                    className={`hd-project-copy ${entry.slug === selected.slug ? "is-active" : ""}`}
                    aria-hidden={entry.slug !== selected.slug}
                  >
                    <span className="hd-kicker">{entry.category}</span>
                    <h3>{entry.client_name}</h3>
                    <p>{entry.description}</p>
                  </div>
                ))}
              </div>
              <nav aria-label="Preview a project">
                {highlights.map((entry, index) => (
                  <Link
                    key={entry.slug}
                    to={projectPath(entry)}
                    data-active={entry.slug === selected.slug}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActive(entry.slug);
                    }}
                    onFocus={() => setActive(entry.slug)}
                  >
                    <small>0{index + 1}</small>
                    <span>{entry.client_name}</span>
                    <ArrowUpRight size={17} />
                  </Link>
                ))}
              </nav>
              <Link className="hd-link" to="/portfolio">
                See the full picture <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </section>
      <ServicePortfolio />
      <section className="home-discovery hd-explore" aria-label="Explore Cirqle">
        <div className="hd-heading">
          <div>
            <span className="hd-kicker">THERE’S MORE TO THE CIRQLE</span>
            <h2>Find your next step.</h2>
          </div>
        </div>
        <div className="hd-explore-grid">
          {[
            ["01", "What we do", "From identity to the everyday campaign.", "/services"],
            ["02", "Who we are", "Different crafts. One connected team.", "/about"],
            ["03", "Join our circle", "Bring your perspective to our next project.", "/careers"],
          ].map(([number, title, copy, path]) => (
            <Link key={path} to={path}>
              <span>
                <span className="hd-explore-icon" aria-hidden="true">{number === "01" ? <Layers3 size={26}/> : number === "02" ? <UsersRound size={26}/> : <Sparkles size={26}/>}</span>
                <ArrowUpRight size={22} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
        <div className="hd-contact">
          <div>
            <span className="hd-kicker">HAVE SOMETHING IN MIND?</span>
            <h2>
              Let’s make it <em>happen.</em>
            </h2>
          </div>
          <Link to="/contact" className="hd-contact-link">
            Start a conversation <ArrowUpRight size={22} />
          </Link>
        </div>
      </section>
    </>
  );
}

function ServicePortfolio() {
  const { collections, loading, error, retry } = useWork();
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  useEffect(() => {
    let live = true;
    getSupermarketFlyers()
      .then((rows) => {
        if (live) setFlyers(rows);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  return (
    <section className="home-discovery hd-services" aria-label="Portfolio by service">
      <div className="hd-heading">
        <div>
          <span className="hd-kicker">EXPLORE BY SERVICE</span>
          <h2>
            Find your <em>creative direction.</em>
          </h2>
        </div>
        <Link className="hd-link" to="/services">
          Our services <ArrowUpRight size={17} />
        </Link>
      </div>
      {loading && <p role="status">Loading services…</p>}
      {error && (
        <p role="alert">
          Service previews are unavailable. <button onClick={retry}>Try again</button>
        </p>
      )}
      <div className="hd-service-grid">
        <Link className="hd-service-card" to="/portfolio?view=gallery#supermarket-flyers">
          <ServiceArtwork images={flyers} />
          <div>
            <h3>Supermarket campaigns</h3>
            <ArrowUpRight size={20} aria-hidden="true" />
          </div>
        </Link>
        {collections
          .filter((c) => c.items.length)
          .map((c) => {
            return (
              <Link className="hd-service-card" key={c.slug} to={`/portfolio/${c.slug}`}>
                <ServiceArtwork images={c.items} />
                <div>
                  <h3>{c.eyebrow || c.title}</h3>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
}

// Only two decoded frames are mounted; shuffle through the entire collection
// before repeating, without fetching every full-size creative on page load.
function ServiceArtwork({ images }: { images: { src: string; srcset?: string }[] }) {
  const element = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<{ src: string; srcset?: string }[]>([]);
  const sources = JSON.stringify(images.map(({ src, srcset }) => ({ src, srcset })));
  useEffect(() => {
    const items = (JSON.parse(sources) as { src: string; srcset?: string }[])
      .filter((item, index, all) => item.src && all.findIndex(other => other.src === item.src) === index);
    const node = element.current;
    if (!node || items.length < 2) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let live = true, visible = false, current = 0;
    let remaining = items.map((_, i) => i).slice(1);
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => { timer = setTimeout(advance, 9000 + Math.random() * 4000); };
    const advance = async () => {
      const card = node.closest('a');
      if (visible && !document.hidden && !reduced.matches && !card?.matches(':hover, :focus-within')) {
        if (!remaining.length) remaining = items.map((_, i) => i).filter(i => i !== current);
        const next = remaining.splice(Math.floor(Math.random() * remaining.length), 1)[0];
        const image = new Image();
        image.sizes = '(max-width:900px) 44vw, 24vw';
        image.srcset = items[next].srcset || '';
        image.src = items[next].src;
        try {
          await image.decode();
          if (live && visible && !document.hidden && !reduced.matches && !card?.matches(':hover, :focus-within')) {
            setFrames([items[current], items[next]]);
            current = next;
          }
        } catch { /* Keep the last complete image when a creative is unavailable. */ }
      }
      if (live) schedule();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.2 });
    observer.observe(node);
    schedule();
    return () => { live = false; clearTimeout(timer); observer.disconnect(); };
  }, [sources]);
  const shown = frames.length ? frames : images.slice(0, 1);
  return <div ref={element} className="hd-service-image" aria-hidden="true">
    {shown.map((item, index) => <img key={item.src} className={frames.length && index === 1 ? 'hd-service-incoming' : ''} src={item.src} srcSet={item.srcset} sizes="(max-width:900px) 44vw, 24vw" alt="" loading="lazy" decoding="async" />)}
  </div>;
}
