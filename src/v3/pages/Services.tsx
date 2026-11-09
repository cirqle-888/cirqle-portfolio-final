import type { CSSProperties } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DIVISIONS, DIVISION_ORDER, SERVICE_DETAIL, type Division } from '../data';
import { ArrowRight, ArrowUpRight } from '../icons';
import { Vibe } from '../Vibes';

function Band({ division, flip }: { division: Division; flip?: boolean }) {
  return (
    <section id={division.key} className={`band${flip ? ' flip' : ''}`} style={{ '--d': division.color } as CSSProperties}>
      <div className="wrap band-grid">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
          <span className="kicker" style={{ '--accent': division.color } as CSSProperties}>
            {division.n} · Division
          </span>
          <h2 className="h-l">{division.name}</h2>
          <p className="ital" style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', color: division.ink }}>
            {division.tag}
          </p>

          <div className="svc-list" style={{ marginTop: 10, width: '100%' }}>
            {division.services.map((service) => (
              <Link className="svc" to={division.path} key={service}>
                <span>
                  <span style={{ display: 'block' }}>{service}</span>
                  <span className="small">{SERVICE_DETAIL[service]}</span>
                </span>
                <ArrowUpRight />
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
            <Link className="btn btn-dark" to={division.path}>
              About {division.short} <ArrowRight />
            </Link>
            <Link className="btn btn-line" to={`/work?division=${division.key}`}>
              View {division.short} work
            </Link>
          </div>
        </div>

        <div className="vibe-slot">
          <Vibe division={division.key} height="440px" />
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Cirqle</title>
        <meta
          name="description"
          content="Creative, Digital and Accounts & Compliance services from one team — branding, design, print, video, social media, websites, ads, GST, tax and bookkeeping."
        />
        <link rel="canonical" href="https://cirqle.work/services" />
      </Helmet>

      <section id="top" style={{ padding: 'clamp(140px, 14vw, 190px) 0 clamp(48px, 5vw, 72px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
          <span className="kicker">Services</span>
          <h1 className="h-xl">
            Everything your business needs,{' '}
            <span className="ital acc" style={{ fontWeight: 500 }}>
              in one place.
            </span>
          </h1>
          <p className="lead" style={{ maxWidth: 560 }}>
            Choose a division to see what is included. Every service comes with the same team and the same point of
            contact.
          </p>
          <div className="jump">
            {DIVISION_ORDER.map((key) => (
              <a key={key} href={`#${key}`} style={{ '--d': DIVISIONS[key].color } as CSSProperties}>
                <i aria-hidden="true" />
                {DIVISIONS[key].name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {DIVISION_ORDER.map((key, index) => (
        <Band key={key} division={DIVISIONS[key]} flip={index === 1} />
      ))}

      <section className="sec">
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
              <h2 className="h-l" style={{ color: '#fff' }}>
                Not sure which one you need?
              </h2>
              <p className="lead" style={{ color: 'rgba(255,255,255,.75)' }}>
                Tell us what you are trying to do and we will point you to the right service.
              </p>
              <Link className="btn btn-acc" to="/contact">
                Get in touch <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
