import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers3, UsersRound, Sparkles } from "lucide-react";
import { useShowcase } from "../../lib/showcase";
import { useWork } from "../../lib/work";
import { getSupermarketFlyers, type Flyer } from "../../services/flyerService";
import "./HomeDiscovery.css";

export function HomeDiscovery() {
  const { entries, loading, error, retry } = useShowcase();
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
              to={selected.project_path || "/portfolio"}
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
                  <button
                    key={entry.slug}
                    aria-pressed={entry.slug === selected.slug}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActive(entry.slug);
                    }}
                    onFocus={() => setActive(entry.slug)}
                    onClick={() => setActive(entry.slug)}
                  >
                    <small>0{index + 1}</small>
                    <span>{entry.client_name}</span>
                    <ArrowUpRight size={17} />
                  </button>
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
  const [flyer, setFlyer] = useState<Flyer | null>(null);
  useEffect(() => {
    let live = true;
    getSupermarketFlyers()
      .then((rows) => {
        if (live) setFlyer(rows[0] || null);
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
          <div className="hd-service-image">
            {flyer ? (
              <img
                src={flyer.src}
                srcSet={flyer.srcset}
                sizes="(max-width:700px) 44vw, 22vw"
                alt="Supermarket campaign artwork"
                loading="lazy"
              />
            ) : (
              <span aria-hidden="true">↗</span>
            )}
          </div>
          <div>
            <h3>Supermarket campaigns</h3>
            <ArrowUpRight size={20} aria-hidden="true" />
          </div>
        </Link>
        {collections
          .filter((c) => c.items.length)
          .map((c) => {
            const brand = c.brands[0];
            return (
              <Link className="hd-service-card" key={c.slug} to={`/portfolio/${c.slug}`}>
                <div className="hd-service-image">
                  <img
                    src={brand.coverImage?.src || brand.cover.src}
                    alt={`${c.eyebrow || c.title} portfolio`}
                    loading="lazy"
                  />
                </div>
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
