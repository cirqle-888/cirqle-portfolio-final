import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { DIVISIONS, DIVISION_ORDER, divisionForCollection, type DivisionKey } from '../data';
import { ArrowRight, ArrowUpRight } from '../icons';
import { useShowcase, type Showcase } from '../../lib/showcase';
import { useWork, type WorkItem } from '../../lib/work';

const SLIDE_MS = 6000;
const IDLE_MS = 2800;
const NAV_IDLE_MS = 3200;

type Filter = 'all' | DivisionKey;

const isDivision = (value: string | null): value is DivisionKey =>
  value === 'creative' || value === 'digital' || value === 'accounts';

/**
 * The stage is pinned inside a taller wrapper, so the artwork holds for about
 * half a screen of scrolling before the grid arrives. The panels and the site
 * header step back once nobody is moving, and any upward gesture brings the
 * header straight back.
 */
function Presentation({ entries }: { entries: Showcase[] }) {
  const [index, setIndex] = useState(0);
  const [idle, setIdle] = useState(false);
  const [paused, setPaused] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);

  const count = entries.length;
  const current = count ? entries[index % count] : undefined;

  const wake = useCallback(() => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), IDLE_MS);
  }, []);

  useEffect(() => {
    // Start the idle clock without touching state: nothing is idle on arrival.
    idleTimer.current = window.setTimeout(() => setIdle(true), IDLE_MS);
    return () => window.clearTimeout(idleTimer.current);
  }, []);

  useEffect(() => {
    if (!count || paused) return;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [count, paused, index]);

  // The header steps aside for the artwork, and comes back on any upward move.
  useEffect(() => {
    const dwell = document.querySelector('.dwell');
    if (!dwell) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    let away = false;
    let previousY = window.scrollY;
    let touchY = 0;
    const timer = window.setTimeout(hide, NAV_IDLE_MS);

    function inPresentation() {
      return dwell!.getBoundingClientRect().bottom > 140;
    }
    function show() {
      window.clearTimeout(timer);
      if (!away) return;
      away = false;
      root.classList.remove('nv-away');
    }
    function hide() {
      if (away || !inPresentation()) return;
      away = true;
      root.classList.add('nv-away');
    }
    const gesture = (up: boolean) => (up ? show() : hide());
    const nested = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('.plist, .pcap, .menu, header, input, textarea, select'));

    const onWheel = (event: WheelEvent) => {
      if (nested(event.target) || event.ctrlKey) return;
      if (Math.abs(event.deltaY) < 4 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      gesture(event.deltaY < 0);
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (!inPresentation()) {
        show();
        previousY = y;
        return;
      }
      if (Math.abs(y - previousY) > 8) {
        gesture(y < previousY);
        previousY = y;
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.clientY < 18) show();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (nested(event.target)) return;
      const distance = (event.changedTouches[0]?.clientY ?? 0) - touchY;
      if (Math.abs(distance) > 40) gesture(distance > 0);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.clearTimeout(timer);
      root.classList.remove('nv-away');
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  if (!count) return null;

  return (
    <div className="dwell" id="top">
      <section
        className={`pres${idle ? ' p-idle' : ''}`}
        onMouseEnter={() => {
          setPaused(true);
          wake();
        }}
        onMouseLeave={() => {
          setPaused(false);
          window.clearTimeout(idleTimer.current);
          setIdle(true);
        }}
        onMouseMove={wake}
      >
        {entries.map((entry, i) => (
          <img
            key={entry.slug}
            className={`pm${i === index ? ' on' : ''}`}
            src={entry.media_type === 'video' ? (entry.poster_url ?? entry.media_url) : entry.media_url}
            alt={entry.alt_text || entry.client_name}
            style={{ objectPosition: `${entry.focal_x}% ${entry.focal_y}%` }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

        <div className="shade" />

        <div className="ptop">
          <a className="pbrowse" href="#grid">
            All work <ArrowUpRight />
          </a>
        </div>

        <div className="plist">
          <span className="lbl">Clients</span>
          {entries.map((entry, i) => (
            <button
              type="button"
              key={entry.slug}
              className={`pc${i === index ? ' on' : ''}`}
              aria-pressed={i === index}
              onClick={() => {
                setIndex(i);
                wake();
              }}
            >
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              {entry.client_name}
            </button>
          ))}
        </div>

        <div className="pcap">
          <div className="cc ghost" style={{ position: 'static', opacity: 1, transform: 'none' }} aria-hidden="true">
            <div className="eb">{current?.category}</div>
            <div className="nm">{current?.client_name}</div>
            <div className="ln">{current?.description}</div>
            <div className="go">See service</div>
          </div>
          {entries.map((entry, i) => (
            <div className={`cc${i === index ? ' on' : ''}`} key={entry.slug}>
              <div className="eb">{entry.category}</div>
              <div className="nm">{entry.client_name}</div>
              <div className="ln">{entry.description}</div>
              <Link className="go" to={entry.project_path ?? '/services'}>
                See service <ArrowRight />
              </Link>
            </div>
          ))}
        </div>

        <div className="pdots" aria-hidden="true">
          {entries.map((entry, i) => (
            <i key={entry.slug} className={i === index ? 'on' : undefined} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface Tile {
  item: WorkItem;
  division: DivisionKey;
}

export function Work() {
  const { collections, loading, error, retry } = useWork();
  const { entries: showcase } = useShowcase();
  const [params, setParams] = useSearchParams();

  const divisionParam = params.get('division');
  const filter: Filter = isDivision(divisionParam) ? divisionParam : 'all';
  const brand = params.get('brand') ?? 'all';

  const setFilter = (next: Filter) => {
    const search = new URLSearchParams(params);
    if (next === 'all') search.delete('division');
    else search.set('division', next);
    search.delete('brand');
    setParams(search, { replace: true });
  };

  const setBrand = (next: string) => {
    const search = new URLSearchParams(params);
    if (next === 'all') search.delete('brand');
    else search.set('brand', next);
    setParams(search, { replace: true });
  };

  const tiles: Tile[] = useMemo(
    () =>
      collections.flatMap((collection) =>
        collection.items.map((item) => ({ item, division: divisionForCollection(collection.slug) })),
      ),
    [collections],
  );

  const shown = tiles.filter(
    (tile) => (filter === 'all' || tile.division === filter) && (brand === 'all' || tile.item.brandSlug === brand),
  );

  const brands = useMemo(() => {
    const seen = new Map<string, string>();
    tiles
      .filter((tile) => filter === 'all' || tile.division === filter)
      .forEach((tile) => seen.set(tile.item.brandSlug, tile.item.brandName));
    return Array.from(seen, ([slug, name]) => ({ slug, name }));
  }, [tiles, filter]);

  return (
    <>
      <Helmet>
        <title>Work | Cirqle</title>
        <meta
          name="description"
          content="Selected work from Cirqle's creative, digital and accounts divisions. Open any project to see the service behind it."
        />
        <link rel="canonical" href="https://cirqle.work/work" />
      </Helmet>

      <Presentation entries={showcase} />

      {/* Without a showcase the heading is the top of the page, so it needs the
          same clearance the stage would have given it. */}
      <section
        id={showcase.length ? undefined : 'top'}
        style={{ padding: showcase.length ? 'clamp(56px, 6vw, 88px) 0 28px' : 'clamp(140px, 14vw, 190px) 0 28px' }}
      >
        <div
          className="wrap"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}
        >
          <h2 className="h-l">
            All{' '}
            <span className="ital acc" style={{ fontWeight: 500 }}>
              work.
            </span>
          </h2>
          <p className="lead" style={{ maxWidth: 420 }}>
            Open any project to see the service behind it.
          </p>
        </div>
      </section>

      <div className="fbar">
        <div className="wrap">
          <button
            type="button"
            className={`chip${filter === 'all' ? ' is-on' : ''}`}
            style={{ ['--d' as string]: '#16132A' }}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {DIVISION_ORDER.map((key) => (
            <button
              type="button"
              key={key}
              className={`chip${filter === key ? ' is-on' : ''}`}
              style={{ ['--d' as string]: DIVISIONS[key].color }}
              onClick={() => setFilter(key)}
            >
              {DIVISIONS[key].short}
            </button>
          ))}

          <div style={{ flexBasis: '100%' }} />

          {filter !== 'all' && brands.length > 1 && (
            <div className="brow show">
              <button
                type="button"
                className={`bch${brand === 'all' ? ' is-on' : ''}`}
                onClick={() => setBrand('all')}
              >
                All
              </button>
              {brands.map((entry) => (
                <button
                  type="button"
                  key={entry.slug}
                  className={`bch${brand === entry.slug ? ' is-on' : ''}`}
                  onClick={() => setBrand(entry.slug)}
                >
                  {entry.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section id="grid" style={{ padding: '28px 0 clamp(72px, 8vw, 120px)' }}>
        <div className="wrap">
          {error && (
            <p className="lead">
              {error}{' '}
              <button type="button" className="ul" onClick={retry} style={{ background: 'none', border: 0, cursor: 'pointer' }}>
                Try again
              </button>
            </p>
          )}
          {!error && loading && <p className="lead">Loading our work…</p>}
          {!error && !loading && !shown.length && <p className="lead">Nothing filed here yet.</p>}

          <div className="grid">
            {shown.map(({ item, division }) => (
              <Link
                key={item.id}
                className="tile wt"
                to={DIVISIONS[division].path}
                style={{ ['--d' as string]: DIVISIONS[division].color }}
              >
                <img src={item.src} srcSet={item.srcset} sizes="(min-width:1024px) 25vw, 50vw" alt={item.caption || item.brandName} loading="lazy" />
                <span className="cap">{item.caption || DIVISIONS[division].short}</span>
                <span className="meta">
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span className="outfit" style={{ fontSize: 17, fontWeight: 700 }}>
                      {item.brandName}
                    </span>
                    <span className="small">{DIVISIONS[division].short} · See service</span>
                  </span>
                  <span className="go">
                    <ArrowUpRight />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="sec"
        style={{ borderTop: '1px solid rgba(22,19,42,.08)', paddingTop: 'clamp(56px,6vw,88px)' }}
      >
        <div
          className="wrap"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}
        >
          <h2 className="h-l">Your project could be next.</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link className="btn btn-acc" to="/contact">
              Get in touch <ArrowRight />
            </Link>
            <Link className="btn btn-line" to="/services">
              All services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
