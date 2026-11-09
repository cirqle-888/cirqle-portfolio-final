import type { CSSProperties } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CONTACT, DIVISIONS, SERVICE_DETAIL, divisionForCollection, type DivisionKey } from '../data';
import { ArrowRight, ArrowUpRight } from '../icons';
import { RetailBlock, Vibe } from '../Vibes';
import { useWork } from '../../lib/work';

const ACCOUNTS_RESULTS: [string, string][] = [
  ['On time', 'Monthly GST and TDS filings'],
  ['1 page', 'MIS report the owner reads'],
  ['Planned', 'Advance tax, no surprises'],
];

function DivisionStrip({ division }: { division: DivisionKey }) {
  const { collections } = useWork();
  const items = collections
    .filter((collection) => divisionForCollection(collection.slug) === division)
    .flatMap((collection) => collection.items)
    .slice(0, 4);

  const showResults = division === 'accounts';
  if (!items.length && !showResults) return null;

  return (
    <div className="strip">
      {items.map((item) => (
        <Link
          key={item.id}
          className="tile wt"
          to={`/work?division=${division}&brand=${item.brandSlug}`}
          style={{ '--d': DIVISIONS[division].color } as CSSProperties}
        >
          <img src={item.src} srcSet={item.srcset} sizes="(min-width:768px) 25vw, 50vw" alt={item.caption || item.brandName} loading="lazy" />
          <span className="cap">{item.caption || item.brandName}</span>
        </Link>
      ))}

      {showResults &&
        ACCOUNTS_RESULTS.map(([headline, line]) => (
          <div
            className="tile"
            key={headline}
            style={{
              background: '#fff',
              border: '1px solid rgba(22,19,42,.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 22,
            }}
          >
            <span
              className="outfit"
              style={{
                fontSize: 'clamp(34px,3vw,44px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#5B3FD6',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {headline}
            </span>
            <span className="small" style={{ color: '#16132A', fontWeight: 500 }}>
              {line}
            </span>
          </div>
        ))}
    </div>
  );
}

export function DivisionPage({ division: key }: { division: DivisionKey }) {
  const division = DIVISIONS[key];

  return (
    <>
      <Helmet>
        <title>{division.name} | Cirqle</title>
        <meta name="description" content={division.intro} />
        <link rel="canonical" href={`https://cirqle.work${division.path}`} />
      </Helmet>

      <section
        id="top"
        style={{ padding: 'clamp(140px, 14vw, 190px) 0 clamp(48px, 5vw, 72px)', '--d': division.color } as CSSProperties}
      >
        <div className="wrap dhero">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
            <span className="kicker" style={{ '--accent': division.color } as CSSProperties}>
              {division.n} · Division
            </span>
            <h1 className="h-xl">{division.name}</h1>
            <p className="ital" style={{ fontSize: 'clamp(22px, 2vw, 30px)', color: division.ink }}>
              {division.tag}
            </p>
            <p className="lead" style={{ maxWidth: 520 }}>
              {division.intro}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link className="btn btn-acc" to="/contact" style={{ '--accent': division.color } as CSSProperties}>
                Get in touch <ArrowRight />
              </Link>
              <Link className="btn btn-line" to={`/work?division=${key}`}>
                View {division.short} work
              </Link>
            </div>
          </div>
          <Vibe division={key} height="440px" />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0, '--d': division.color } as CSSProperties}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="kicker" style={{ '--accent': division.color } as CSSProperties}>
                What is included
              </span>
              <h2 className="h-l" style={{ marginTop: 14 }}>
                Services
              </h2>
            </div>
            <Link className="btn btn-line" to="/services">
              All services <ArrowUpRight />
            </Link>
          </div>
          <div className="incl">
            {division.services.map((service) => (
              <div className="inc" key={service}>
                <span className="dotl">{service}</span>
                <span className="small">{SERVICE_DETAIL[service]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {key === 'creative' && <RetailBlock />}

      <section className="sec" style={{ paddingTop: 0, '--d': division.color } as CSSProperties}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="kicker" style={{ '--accent': division.color } as CSSProperties}>
                How it works
              </span>
              <h2 className="h-l" style={{ marginTop: 14 }}>
                Three simple steps.
              </h2>
            </div>
          </div>
          <div className="steps">
            {division.steps.map(([title, line]) => (
              <div className="step" key={title}>
                <p className="h-m">{title}</p>
                <p className="small" style={{ marginTop: 8 }}>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="kicker" style={{ '--accent': division.color } as CSSProperties}>
                Selected work
              </span>
              <h2 className="h-l" style={{ marginTop: 14 }}>
                {division.short} projects.
              </h2>
            </div>
            <Link className="btn btn-line" to={`/work?division=${key}`}>
              All {division.short} work <ArrowUpRight />
            </Link>
          </div>
          <DivisionStrip division={key} />
        </div>
      </section>

      <section className="sec" style={{ background: '#16132A', color: '#fff' }}>
        <div
          className="wrap"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}
        >
          <h2 className="h-l" style={{ color: '#fff' }}>
            Ready when you are.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link className="btn btn-acc" to="/contact" style={{ '--accent': division.color } as CSSProperties}>
              Get in touch
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
      </section>
    </>
  );
}

export const Creative = () => <DivisionPage division="creative" />;
export const Digital = () => <DivisionPage division="digital" />;
export const Accounts = () => <DivisionPage division="accounts" />;
