import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ART, type DivisionKey } from './data';
import { ArrowRight, Check } from './icons';

/** Each division gets a panel built from the thing it actually makes. */

interface VibeProps { height?: string; className?: string }

export function CreativeVibe({ height = '420px', className = '' }: VibeProps) {
  return (
    <div className={`vibe ${className}`.trim()} style={{ '--soft': '#FFF1F8', '--d': '#D9479F', height } as CSSProperties}>
      <div className="art float" style={{ left: '9%', top: '9%', height: '58%', transform: 'rotate(-5deg)' }}>
        <img src={ART.elaraBrand} alt="Brand identity work" style={{ aspectRatio: '1/1' }} />
        <span className="al">Brand identity</span>
      </div>
      <div className="art float d2" style={{ right: '8%', top: '7%', height: '72%', transform: 'rotate(4deg)' }}>
        <img src={ART.offer} alt="Supermarket offer page" style={{ aspectRatio: '1/1.3' }} />
        <span className="al">Retail Offers</span>
      </div>
      <div
        className="art"
        style={{ left: '50%', bottom: '7%', height: '42%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2 }}
      >
        <img src={ART.elmidoPackaging} alt="Packaging work" style={{ aspectRatio: '1.8/1' }} />
        <span className="al">Packaging</span>
      </div>
      <div
        className="swatches"
        style={{
          position: 'absolute',
          left: '8%',
          bottom: '10%',
          padding: 8,
          background: 'rgba(255,255,255,.85)',
          borderRadius: 12,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span style={{ background: '#D9479F' }} />
        <span style={{ background: '#7C5CFF' }} />
        <span style={{ background: '#1E8FD6' }} />
        <span style={{ background: '#16132A' }} />
      </div>
    </div>
  );
}

export function DigitalVibe({ height = '420px', className = '' }: VibeProps) {
  return (
    <div className={`vibe ${className}`.trim()} style={{ '--soft': '#EEF7FD', '--d': '#1E8FD6', height } as CSSProperties}>
      <div className="dots" aria-hidden="true" />
      <div className="phone float" style={{ left: '50%', top: '9%', transform: 'translateX(-50%)' }}>
        <div className="scr">
          <img src={ART.rootsSocial} alt="Social media post" />
        </div>
      </div>
      <div className="metric float d2" style={{ left: '7%', top: '22%' }}>
        <div>
          <b>2.4x</b>
          <div className="small">Reach</div>
        </div>
        <span className="up">↑ month on month</span>
      </div>
      <div className="metric float" style={{ right: '6%', top: '48%', animationDelay: '-4s' }}>
        <div>
          <b>18</b>
          <div className="small">Posts / month</div>
        </div>
      </div>
      <div className="metric float d2" style={{ left: '9%', bottom: '12%' }}>
        <div>
          <b>₹ 12</b>
          <div className="small">Cost per lead</div>
        </div>
        <span className="up">↓ lower</span>
      </div>
    </div>
  );
}

const LEDGER: [string, string, boolean][] = [
  ['GST return · GSTR-3B', '20 Nov', true],
  ['TDS payment', '07 Nov', true],
  ['Advance tax · Q3', '15 Dec', false],
  ['MIS report · October', '05 Nov', true],
];

export function AccountsVibe({ height = '420px', className = '' }: VibeProps) {
  return (
    <div className={`vibe ${className}`.trim()} style={{ '--soft': '#F2EFFF', '--d': '#5B3FD6', height } as CSSProperties}>
      <div className="rule" aria-hidden="true" />
      <div className="ledger">
        <div className="row">
          <span>Item</span>
          <span className="num">Due</span>
          <span>Status</span>
        </div>
        {LEDGER.map(([name, due, filed]) => (
          <div className="row" key={name}>
            <span>{name}</span>
            <span className="num">{due}</span>
            {filed ? (
              <span className="ok">
                <Check />
                Filed
              </span>
            ) : (
              <span className="ok" style={{ background: '#F2EFFF', color: '#3B2694' }}>
                Scheduled
              </span>
            )}
          </div>
        ))}
      </div>
      <span className="stamp" style={{ right: '8%', bottom: '10%' }}>
        ON TIME ✓
      </span>
    </div>
  );
}

export function Vibe({ division, height, className }: VibeProps & { division: DivisionKey }) {
  if (division === 'digital') return <DigitalVibe height={height} className={className} />;
  if (division === 'accounts') return <AccountsVibe height={height} className={className} />;
  return <CreativeVibe height={height} className={className} />;
}

/** Retail offers are the largest recurring line, so they get their own band. */
export function RetailBlock() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="retail">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 22,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <span className="kicker" style={{ '--accent': '#D9479F' } as CSSProperties}>
              Retail Offers
            </span>
            <h2 className="h-l">
              Weekly offers,{' '}
              <span className="ital" style={{ fontWeight: 500, color: '#8F1C62' }}>
                ready to print.
              </span>
            </h2>
            <p className="lead" style={{ maxWidth: 460 }}>
              Send us your price list. We design the offer, prepare the print file and the WhatsApp version, and deliver
              on schedule every week.
            </p>
            <ul>
              <li>
                <span>
                  <Check />
                </span>
                Supermarkets, hypermarkets and retail chains
              </li>
              <li>
                <span>
                  <Check />
                </span>
                Print and WhatsApp versions
              </li>
              <li>
                <span>
                  <Check />
                </span>
                A fixed weekly schedule
              </li>
            </ul>
            <Link className="btn btn-dark" to="/work?division=creative">
              See retail work <ArrowRight />
            </Link>
          </div>
          <div className="pic">
            <img className="p1" src={ART.offer} alt="Supermarket offer page" />
            <img className="p2" src={ART.offer2} alt="Supermarket offer page" />
          </div>
        </div>
      </div>
    </section>
  );
}
