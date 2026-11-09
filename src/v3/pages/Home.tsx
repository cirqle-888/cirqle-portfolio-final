import type { CSSProperties } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CONTACT, DIVISIONS, DIVISION_ORDER, TAGLINE, divisionForCollection } from '../data';
import { ArrowRight, ArrowUpRight } from '../icons';
import { RetailBlock, Vibe } from '../Vibes';
import { useWork } from '../../lib/work';

function DivisionCard({ division, flip }: { division: (typeof DIVISIONS)[keyof typeof DIVISIONS]; flip?: boolean }) {
  return (
    <article className={`div${flip ? ' flip' : ''}`} style={{ '--d': division.color } as CSSProperties}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, padding: 8 }}>
        <span className="kicker" style={{ '--accent': division.color } as CSSProperties}>
          {division.n} · Division
        </span>
        <h3 className="h-l">{division.name}</h3>
        <p className="ital" style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', color: division.ink }}>
          {division.tag}
        </p>
        <div className="svcs">
          {division.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
          <Link className="btn btn-dark" to={division.path} style={{ '--accent': division.color } as CSSProperties}>
            Explore {division.short} <ArrowRight />
          </Link>
          <Link className="btn btn-line" to={`/work?division=${division.key}`}>
            View work
          </Link>
        </div>
      </div>
      <div className="vibe-slot">
        <Vibe division={division.key} height="380px" />
      </div>
    </article>
  );
}

/** Six recent pieces, straight from the portfolio Cirqle publishes. */
function WorkStrip() {
  const { collections } = useWork();
  const items = collections
    .flatMap((collection) =>
      collection.items.map((item) => ({ item, division: divisionForCollection(collection.slug) })),
    )
    .slice(0, 6);

  if (!items.length) return null;

  return (
    <div className="strip">
      {items.map(({ item, division }) => (
        <Link
          key={item.id}
          className="tile wt"
          to={DIVISIONS[division].path}
          style={{ '--d': DIVISIONS[division].color } as CSSProperties}
        >
          <img src={item.src} srcSet={item.srcset} sizes="(min-width:1100px) 16vw, 50vw" alt={item.caption || item.brandName} loading="lazy" />
          <span className="cap">{item.caption || DIVISIONS[division].short}</span>
        </Link>
      ))}
    </div>
  );
}

export function Home() {
  return (
    <>
      <Helmet>
        <title>Cirqle — Creative, Digital and Accounts services</title>
        <meta
          name="description"
          content="Cirqle brings design, marketing and accounting under one roof. One team, one point of contact for everything your business needs."
        />
        <link rel="canonical" href="https://cirqle.work" />
      </Helmet>

      <section id="top" className="hero">
        <div className="wrap hero-grid">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
            <span className="kicker">{TAGLINE}</span>
            <h1 className="h-xl">
              We move your business{' '}
              <span className="ital acc" style={{ fontWeight: 500 }}>
                forward.
              </span>
            </h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              Creative, digital and accounts services from one team, so you have one point of contact for everything
              your business needs.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link className="btn btn-acc" to="/services">
                Our services <ArrowRight />
              </Link>
              <Link className="btn btn-line" to="/work">
                View work
              </Link>
            </div>
          </div>

          <div className="fan" aria-hidden="true">
            <Vibe division="creative" height="360px" className="v1" />
            <Vibe division="digital" height="360px" className="v2" />
            <Vibe division="accounts" height="360px" className="v3" />
          </div>
        </div>
      </section>

      <section id="divisions" className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="kicker">What we do</span>
              <h2 className="h-l" style={{ marginTop: 14 }}>
                Three divisions.{' '}
                <span className="ital acc" style={{ fontWeight: 500 }}>
                  One team.
                </span>
              </h2>
            </div>
            <Link className="btn btn-line" to="/services">
              All services <ArrowUpRight />
            </Link>
          </div>
          <div className="divs">
            {DIVISION_ORDER.map((key, index) => (
              <DivisionCard key={key} division={DIVISIONS[key]} flip={index === 1} />
            ))}
          </div>
        </div>
      </section>

      <RetailBlock />

      <section id="work" className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="kicker">Selected work</span>
              <h2 className="h-l" style={{ marginTop: 14 }}>
                Recent projects.
              </h2>
            </div>
            <Link className="btn btn-line" to="/work">
              All work <ArrowUpRight />
            </Link>
          </div>
          <WorkStrip />
        </div>
      </section>

      <section
        id="about"
        className="sec"
        style={{
          background: '#fff',
          borderTop: '1px solid rgba(22,19,42,.08)',
          borderBottom: '1px solid rgba(22,19,42,.08)',
        }}
      >
        <div className="wrap">
          <div className="about">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span className="kicker">About Cirqle</span>
              <h2 className="h-l">A multi-service studio for growing businesses.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'flex-end' }}>
              <p className="lead">
                Cirqle Works brings design, marketing and accounting under one roof. You brief one team, and we handle
                the rest.
              </p>
              <p className="lead">
                The circle is built to grow. New services join the same team and the same standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="sec">
        <div className="wrap">
          <div className="contact">
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 22,
                maxWidth: 640,
              }}
            >
              <span className="kicker" style={{ color: 'rgba(255,255,255,.7)' }}>
                Get in touch
              </span>
              <h2 className="h-l" style={{ color: '#fff' }}>
                Tell us what you need. We will take it from there.
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link className="btn btn-acc" to="/contact">
                  Start a project <ArrowRight />
                </Link>
                <a
                  className="btn"
                  href={CONTACT.whatsapp}
                  style={{ background: 'rgba(255,255,255,.1)', color: '#fff', borderColor: 'rgba(255,255,255,.2)' }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
