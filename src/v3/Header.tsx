import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ART, CONTACT, DIVISIONS, DIVISION_ORDER } from './data';
import { ArrowUpRight, CloseX, DivisionIcon, MenuLines, ServiceIcon } from './icons';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

/** The bar is glass over whatever is behind it, so it never hides the artwork. */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen, close]);

  const logo = (
    <Link to="/" aria-label="Cirqle home" className="cq-logo" onClick={close}>
      <img src={ART.logo} alt="Cirqle" />
    </Link>
  );

  return (
    <>
      <div className={`menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="wrap">
          <div className="mtop">
            {logo}
            <button type="button" className="mclose" aria-label="Close menu" onClick={close}>
              <CloseX />
            </button>
          </div>

          <div className="mgrid">
            <nav className="mlist" aria-label="Menu">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`mi${pathname === item.to ? ' cur' : ''}`}
                  onClick={close}
                >
                  <span className="mn">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mt">{item.label}</span>
                  <span className="ma">
                    <ArrowUpRight />
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mside">
              <p className="outfit" style={{ fontSize: 16, fontWeight: 600, color: '#55526B' }}>
                What we do
              </p>

              {DIVISION_ORDER.map((key) => {
                const division = DIVISIONS[key];
                return (
                  <Link
                    key={key}
                    className="mdiv"
                    to={division.path}
                    onClick={close}
                    style={
                      {
                        '--d': division.color,
                        '--soft': division.soft,
                        '--ink': division.ink,
                      } as React.CSSProperties
                    }
                  >
                    <span className="mico">
                      <DivisionIcon division={key} />
                    </span>
                    <span className="mbody">
                      <span className="mname">{division.name}</span>
                      <span className="mchips">
                        {division.services.map((service) => (
                          <span className="mchip" key={service}>
                            <ServiceIcon name={service} />
                            {service}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                );
              })}

              <p className="outfit mline">
                Good things start with a{' '}
                <span className="ital acc" style={{ fontWeight: 500 }}>
                  conversation.
                </span>
              </p>
              <Link className="btn btn-dark" to="/contact" onClick={close} style={{ alignSelf: 'flex-start' }}>
                Get in touch <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <header className="navbar">
        <div className="wrap">
          <nav className="nav" aria-label="Main">
            {logo}
            <div className="nright">
              <Link className="btn btn-dark" to="/contact" style={{ padding: '11px 18px', fontSize: 14 }}>
                Get in touch
              </Link>
              <button
                type="button"
                className="mbtn"
                aria-expanded={menuOpen}
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                Menu <MenuLines />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <a className="wa" href={CONTACT.whatsapp} aria-label="Chat with Cirqle on WhatsApp">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ADE80"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
        </svg>
        WhatsApp
      </a>
    </>
  );
}
