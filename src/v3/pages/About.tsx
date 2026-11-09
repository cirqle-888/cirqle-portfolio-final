import type { CSSProperties } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DIVISIONS, DIVISION_ORDER } from '../data';
import { ArrowRight, DivisionIcon, ServiceIcon } from '../icons';

const STATS: [string, string, string, string][] = [
  ['1', 'Point of contact', 'One person who knows your business and your work.', 'Person'],
  ['3', 'Divisions', 'Creative, Digital and Accounts, working together.', 'Circle'],
  ['14+', 'Services', 'From a logo to a tax return, all in one place.', 'Grid'],
];

export function About() {
  return (
    <>
      <Helmet>
        <title>About | Cirqle</title>
        <meta
          name="description"
          content="Cirqle Works brings design, marketing and accounting under one roof — one team and one point of contact for growing businesses."
        />
        <link rel="canonical" href="https://cirqle.work/about" />
      </Helmet>

      <section id="top" style={{ padding: 'clamp(140px, 14vw, 190px) 0 clamp(48px, 5vw, 72px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
          <span className="kicker">About</span>
          <h1 className="h-xl">
            One team for every part of{' '}
            <span className="ital acc" style={{ fontWeight: 500 }}>
              your business.
            </span>
          </h1>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(64px, 7vw, 100px)' }}>
        <div className="wrap">
          <div className="ab2">
            <p className="lead">
              Cirqle Works brings design, marketing and accounting under one roof. You brief one team, and we handle
              the rest.
            </p>
            <p className="lead">
              The circle is built to grow. New services join the same team and the same standard, so your business
              never has to look for someone new.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(64px, 7vw, 100px)' }}>
        <div className="wrap">
          <div className="stats">
            {STATS.map(([figure, title, line, icon]) => (
              <div className="st" key={title}>
                <span className="mico" style={{ background: 'rgba(255,255,255,.08)', color: '#fff' }}>
                  <ServiceIcon name={icon} size={22} />
                </span>
                <b>{figure}</b>
                <p className="h-m" style={{ color: '#fff' }}>
                  {title}
                </p>
                <p className="small" style={{ color: 'rgba(255,255,255,.7)' }}>
                  {line}
                </p>
                {title === 'Divisions' && (
                  <span className="trio">
                    {DIVISION_ORDER.map((key) => (
                      <i key={key} style={{ background: DIVISIONS[key].color }} />
                    ))}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(72px, 8vw, 120px)' }}>
        <div className="wrap">
          <h2 className="h-l" style={{ marginBottom: 32 }}>
            Our divisions.
          </h2>
          <div className="ab3">
            {DIVISION_ORDER.map((key) => {
              const division = DIVISIONS[key];
              return (
                <Link
                  className="abd"
                  key={key}
                  to={division.path}
                  style={{ '--d': division.color, '--soft': division.soft } as CSSProperties}
                >
                  <span className="mico" style={{ color: division.color }}>
                    <DivisionIcon division={key} />
                  </span>
                  <p className="h-m">{division.name}</p>
                  <p className="small">{division.tag}</p>
                  <span
                    className="outfit"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 15,
                      fontWeight: 600,
                      color: division.ink,
                    }}
                  >
                    See services <ArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
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
                Let us talk about your business.
              </h2>
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
